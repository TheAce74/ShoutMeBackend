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
  const { title, description, location, user } =
    req.body as WithToken<AddEmergencyBody>;

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
