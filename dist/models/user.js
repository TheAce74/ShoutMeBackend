"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const constants_1 = require("@/lib/constants");
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: true, default: null },
  },
  constants_1.MONGODB_SCHEMA_OPTIONS
);
exports.User = (0, mongoose_1.model)("User", userSchema);
