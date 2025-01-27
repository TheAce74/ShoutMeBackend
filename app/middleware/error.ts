import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof Error) {
    res.status(500).json({
      message: error.message,
      devMessage: error.toString(),
    });
  } else {
    res.status(500).json({
      message: "Something went terribly wrong!",
      devMessage: String(error),
    });
  }
};
