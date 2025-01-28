"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof zod_1.ZodError) {
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
exports.validateSchema = validateSchema;
