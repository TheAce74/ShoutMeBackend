import { Defined } from "@/lib/types";
import jwt, { JwtPayload } from "jsonwebtoken";

export const generateToken = (userId: string, secret: string): string => {
  return jwt.sign({ id: userId }, secret);
};

export const verifyToken = (
  token: string,
  secret: string
): JwtPayload | string => {
  return jwt.verify(token, secret);
};

export const filterDefined = <T extends Record<string, unknown>>(
  obj: T
): Defined<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      acc[key as keyof T] = value as Defined<T>[keyof T];
    }
    return acc;
  }, {} as Defined<T>);
};
