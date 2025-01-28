import { SchemaOptions } from "mongoose";

export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])/;

export const MONGODB_SCHEMA_OPTIONS: SchemaOptions = {
  timestamps: true,
  minimize: true,
  versionKey: false,
};
