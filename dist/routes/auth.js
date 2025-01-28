"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const auth_1 = require("@/controllers/auth");
const schema_1 = require("@/lib/schema");
const validation_1 = require("@/middleware/validation");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.authRoutes = router;
router.post(
  "/register",
  (0, validation_1.validateSchema)(schema_1.registerSchema),
  auth_1.register
);
router.post(
  "/login",
  (0, validation_1.validateSchema)(schema_1.loginSchema),
  auth_1.login
);
