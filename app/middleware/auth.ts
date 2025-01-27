import { ENV } from "@/config/env";
import { verifyToken } from "@/lib/utils";
import { Request, Response, NextFunction } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
      devMessage: "Append token in authorization header",
    });
  } else {
    try {
      const decoded = verifyToken(token, ENV.JWT_SECRET);
      (req as unknown as Record<string, unknown>).user = decoded;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: "Invalid token",
        devMessage: "Invalid token",
      });
    }
  }
};
