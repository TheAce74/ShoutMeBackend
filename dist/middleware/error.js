"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, _req, res, next) => {
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
exports.errorHandler = errorHandler;
