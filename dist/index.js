"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("@/config/env");
const error_1 = require("@/middleware/error");
const express_1 = __importDefault(require("express"));
require("@/config/db");
const auth_1 = require("@/routes/auth");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
// routes
app.use("/api/auth", auth_1.authRoutes);
// error middleware
app.use(error_1.errorHandler);
// start server
app.listen(env_1.ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${env_1.ENV.PORT}`);
});
