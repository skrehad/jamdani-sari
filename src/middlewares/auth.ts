import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import config from "../config";
import prisma from "../utils/prismaProvider";
import { UserRole } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; role: UserRole };
    }
  }
}
const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;
    if (!token) throw new AppError(401, "User not authenticated");

    let decoded: any;
    try {
      decoded = jwt.verify(token, config.jwt_access_secret!);
    } catch {
      throw new AppError(401, "Invalid token");
    }

    // fetch full user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true },
    });

    if (!user) throw new AppError(401, "User not found");

    // role check
    if (roles.length && !roles.includes(user.role))
      throw new AppError(403, "Forbidden");

    req.user = user; // ✅ attach email + id + role
    next();
  };
};

export default auth;
