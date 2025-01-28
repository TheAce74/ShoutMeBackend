import { AddEmergencyBody, WithToken } from "@/lib/types";
import { Emergency } from "@/models/emergency";
import { Notification } from "@/models/notification";
import { User } from "@/models/user";
import { sendEmail } from "@/services/email";
import { NextFunction, Request, Response } from "express";

export const createEmergency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, location } = req.body as AddEmergencyBody;
  const { user } = req as WithToken<Request>;

  try {
    const emergency = await Emergency.create({
      title,
      description,
      location,
      isActive: true,
      user,
    });

    const users = await User.find({}, "email");

    // send emails and in-app notifications
    const emailPromises = users.map((user) =>
      sendEmail(
        String(user.email),
        "New Emergency Alert",
        `<h1>${title}</h1><p>${description}</p><p>Location: ${location}</p>`
      )
    );
    const notificationPromises = users.map(() =>
      Notification.create({
        title: `Emergency Alert: ${title}`,
        description,
      })
    );
    await Promise.all([...notificationPromises, ...emailPromises]);

    res
      .status(201)
      .json({ message: "Emergency created successfully", emergency });
  } catch (err) {
    console.error(err);
    const error = new Error("Failed create emergency");
    next(error);
  }
};

export const getEmergencies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page = 1, pageSize = 20, search = "" } = req.query;
  const { user } = req as WithToken<Request>;

  try {
    const pageNumber = parseInt(page as string, 10) || 1;
    const limit = parseInt(pageSize as string, 10) || 20;
    const skip = (pageNumber - 1) * limit;

    // Build the search query
    const searchQuery = {
      user,
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ],
    };

    // Fetch emergencies with pagination
    const [emergencies, total] = await Promise.all([
      Emergency.find(searchQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Emergency.countDocuments(searchQuery),
    ]);

    const totalPages = Math.ceil(total / limit);

    // Pagination properties
    const pagination = {
      currentPage: pageNumber,
      pageSize: limit,
      totalRecords: total,
      totalPages,
      hasNextPage: pageNumber < totalPages,
      hasPreviousPage: pageNumber > 1,
      nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
      previousPage: pageNumber > 1 ? pageNumber - 1 : null,
    };

    res.status(200).json({
      pagination,
      data: emergencies,
    });
  } catch (err) {
    console.error(err);
    const error = new Error("Failed to fetch emergencies");
    next(error);
  }
};

export const resolveEmergency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    // Find and update the emergency
    const emergency = await Emergency.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true } // Return the updated document
    );

    // If the emergency is not found
    if (!emergency) {
      res.status(404).json({
        message: "Emergency not found",
        devMessage: "Document id is invalid",
      });
    } else {
      res.status(200).json({
        message: "Emergency resolved successfully",
        emergency,
      });
    }
  } catch (err) {
    console.error(err);
    const error = new Error("Failed to resolve emergency");
    next(error);
  }
};
