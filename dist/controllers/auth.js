"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("@/config/env");
const user_1 = require("@/models/user");
const utils_1 = require("@/lib/utils");
const register = async (req, res, next) => {
  const { name, email, phoneNumber, location, password } = req.body;
  const user = await user_1.User.findOne({ email });
  if (user) {
    res.status(409).json({
      message: "User already exists",
      devMessage: "User document already exists",
    });
  } else {
    try {
      const hashedPassword = await bcrypt_1.default.hash(
        password,
        env_1.ENV.BCRYPT_SALT_ROUNDS
      );
      const user = await user_1.User.create({
        name,
        email,
        phoneNumber,
        location,
        password: hashedPassword,
      });
      const token = (0, utils_1.generateToken)(
        user._id.toString(),
        env_1.ENV.JWT_SECRET
      );
      res
        .status(201)
        .json({ message: "User registered successfully", user, token });
    } catch (err) {
      console.error(err);
      const error = new Error("Failed to register user");
      next(error);
    }
  }
};
exports.register = register;
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await user_1.User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "Invalid email or password",
        devMessage: "User doesn't exist",
      });
    } else {
      const isMatch = await bcrypt_1.default.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({
          message: "Invalid password",
          devMessage: "Invalid credentials",
        });
      } else {
        const token = (0, utils_1.generateToken)(
          user._id.toString(),
          env_1.ENV.JWT_SECRET
        );
        res.status(200).json({ message: "Logged in successfully", token });
      }
    }
  } catch (err) {
    console.error(err);
    const error = new Error("Failed to login");
    next(error);
  }
};
exports.login = login;
