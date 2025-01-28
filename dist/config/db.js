"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("@/config/env");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
  .connect(env_1.ENV.MONGODB_URI)
  .then(() => {
    console.log("MongoDB database running successfully");
  })
  .catch((error) => {
    console.log("MongoDB database unavailable");
    console.error(error);
  });
