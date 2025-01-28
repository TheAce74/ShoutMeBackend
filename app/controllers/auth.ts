import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { LoginBody, RegisterBody } from "@/lib/types";
import { ENV } from "@/config/env";
import { User } from "@/models/user";
import { generateToken } from "@/lib/utils";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, phoneNumber, location, password } =
    req.body as RegisterBody;

  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({
      message: "User already exists",
      devMessage: "User document already exists",
    });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(
        password,
        ENV.BCRYPT_SALT_ROUNDS
      );
      const user = await User.create({
        name,
        email,
        phoneNumber,
        location,
        password: hashedPassword,
      });
      const token = generateToken(user._id.toString(), ENV.JWT_SECRET);
      res
        .status(201)
        .json({ message: "User registered successfully", user, token });
    } catch (err) {
      console.error(err);
      const error = new Error("Failed to register user");
      next(error);
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as LoginBody;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "Invalid email or password",
        devMessage: "User doesn't exist",
      });
    } else {
      const isMatch = await bcrypt.compare(password, String(user.password));
      if (!isMatch) {
        res.status(401).json({
          message: "Invalid password",
          devMessage: "Invalid credentials",
        });
      } else {
        const token = generateToken(user._id.toString(), ENV.JWT_SECRET);
        res.status(200).json({ message: "Logged in successfully", token });
      }
    }
  } catch (err) {
    console.error(err);
    const error = new Error("Failed to login");
    next(error);
  }
};
