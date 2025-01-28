import { Notification } from "@/models/notification";
import { Request, Response, NextFunction } from "express";

export const getNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page = 1, pageSize = 20 } = req.query;

  try {
    const pageNumber = parseInt(page as string, 10) || 1;
    const limit = parseInt(pageSize as string, 10) || 20;
    const skip = (pageNumber - 1) * limit;

    // Fetch notifications with pagination
    const [notifications, total] = await Promise.all([
      Notification.find({}).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Notification.countDocuments(),
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
      data: notifications,
    });
  } catch (err) {
    console.error(err);
    const error = new Error("Failed to fetch notifications");
    next(error);
  }
};
