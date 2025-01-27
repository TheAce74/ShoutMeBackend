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
