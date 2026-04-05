// src/utils/jwtHelper.ts
import jwt, { JwtPayload } from "jsonwebtoken";

export interface IJwtPayload {
  id: string;
  email: string;
  role: string;
  status: string;
}

export const generateToken = (
  payload: IJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn as any });
};

export const decodedToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = {
  generateToken,
  decodedToken,
};
