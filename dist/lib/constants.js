"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_SCHEMA_OPTIONS = exports.PASSWORD_REGEX = void 0;
exports.PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])/;
exports.MONGODB_SCHEMA_OPTIONS = {
  timestamps: true,
  minimize: true,
  versionKey: false,
};
