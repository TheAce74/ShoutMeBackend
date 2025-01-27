import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateSchema =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message:
            "Validation error: one or more fields are missing or incorrect",
          devMessage: error.toString(),
        });
      } else {
        next(error);
      }
    }
  };
