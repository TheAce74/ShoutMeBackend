"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const env_1 = require("@/config/env");
const utils_1 = require("@/lib/utils");
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
      devMessage: "Append token in authorization header",
    });
  } else {
    try {
      const decoded = (0, utils_1.verifyToken)(token, env_1.ENV.JWT_SECRET);
      req.user = decoded;
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
exports.authenticate = authenticate;
