import { RegisterBody, WithToken } from "@/lib/types";
import { filterDefined } from "@/lib/utils";
import { User } from "@/models/user";
import { deleteImageFromS3, uploadToS3 } from "@/services/aws";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { ENV } from "@/config/env";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req.body as WithToken<Request["body"]>;

  try {
    // Fetch user from the database
    const userInfo = await User.findById(user).select("-password"); // Exclude password field from the response

    if (!userInfo) {
      res.status(404).json({
        message: "User not found",
        devMessage: "Invalid user id",
      });
    } else {
      // Return user details
      res.status(200).json(userInfo);
    }
  } catch (err) {
    console.error(err);
    const error = new Error("Failed to fetch user");
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phoneNumber, location, password, user } =
      req.body as WithToken<Partial<RegisterBody>>;

    const updatedData = {
      ...filterDefined({
        name,
        email,
        phoneNumber,
        location,
        password,
      }),
      profilePicture: "",
    };

    if (updatedData.password) {
      const hashedPassword = await bcrypt.hash(
        updatedData.password,
        ENV.BCRYPT_SALT_ROUNDS
      );
      updatedData.password = hashedPassword;
    }

    const userInfo = await User.findById(user);

    if (!userInfo) {
      res.status(404).json({
        message: "User not found",
        devMessage: "Invalid user id",
      });
    } else {
      // Check if a new profile picture was uploaded
      if (req.file) {
        const fileExtension = req.file.originalname.split(".").pop(); // Extract file extension
        const s3Key = `profile-pictures/${user}.${fileExtension}`; // Customize the filename with userId

        // Step 1: If there's an existing profile picture, delete it
        if (userInfo.profilePicture) {
          await deleteImageFromS3(String(userInfo.profilePicture)); // Delete the old image
        }

        // Step 2: Upload the new profile picture to S3
        const s3Url = await uploadToS3(req.file, s3Key);

        // Step 3: Update the profilePicture field with the new S3 URL of the uploaded image
        updatedData.profilePicture = s3Url;
      }

      // Step 4: Update the user's information in MongoDB
      const updatedUser = await User.findByIdAndUpdate(
        user,
        filterDefined(updatedData),
        { new: true }
      );

      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
