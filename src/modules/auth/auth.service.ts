import status from "http-status";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prismaProvider";
import { bcryptHelper } from "../../utils/bcryptHelper";
import { jwtHelper, IJwtPayload } from "../../utils/jwtHelper";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import { User, UserStatus } from "@prisma/client";

const buildJwtPayload = (user: User): IJwtPayload => ({
  id: user.id,
  email: user.email,
  role: user.role,
  status: user.status,
});

const loginUser = async (payload: Partial<User>) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) throw new AppError(status.BAD_REQUEST, "User does not exist");

  const isPasswordMatch = await bcryptHelper.comparePassword(
    payload.password!,
    user.password,
  );
  if (!isPasswordMatch)
    throw new AppError(status.BAD_REQUEST, "Password does not match");

  const jwtData = buildJwtPayload(user);

  return {
    accessToken: jwtHelper.generateToken(
      jwtData,
      config.jwt_access_secret!,
      config.jwt_access_expires_in!,
    ),
    refreshToken: jwtHelper.generateToken(
      jwtData,
      config.jwt_refresh_secret!,
      config.jwt_refresh_expires_in!,
    ),
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};

const registerNewUser = async (payload: any) => {
  const isUserExist = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (isUserExist) {
    throw new AppError(status.BAD_REQUEST, "User already exist");
  }

  const hashedPassword = await bcryptHelper.hashPassword(payload.password);

  const user = await prisma.user.create({
    data: {
      name: payload.fullName,
      phone: payload.phone,
      email: payload.email,
      password: hashedPassword,
    },
  });

  const jwtData = buildJwtPayload(user);

  return {
    accessToken: jwtHelper.generateToken(
      jwtData,
      config.jwt_access_secret!,
      config.jwt_access_expires_in!,
    ),
    refreshToken: jwtHelper.generateToken(
      jwtData,
      config.jwt_refresh_secret!,
      config.jwt_refresh_expires_in!,
    ),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role || "USER", // default role
    },
  };
};

// const registerNewUser = async (payload: any) => {
//   const isUserExist = await prisma.user.findUnique({
//     where: { email: payload.email },
//   });

//   if (isUserExist) {
//     throw new AppError(status.BAD_REQUEST, "User already exist");
//   }

//   const hashedPassword = await bcryptHelper.hashPassword(payload.password);

//   const user = await prisma.user.create({
//     data: {
//       name: payload.fullName,
//       phone: payload.phone,
//       email: payload.email,
//       password: hashedPassword,
//     },
//   });

//   const jwtData = buildJwtPayload(user);

//   return {
//     accessToken: jwtHelper.generateToken(
//       jwtData,
//       config.jwt_access_secret!,
//       config.jwt_access_expires_in!,
//     ),
//     refreshToken: jwtHelper.generateToken(
//       jwtData,
//       config.jwt_refresh_secret!,
//       config.jwt_refresh_expires_in!,
//     ),
//   };
// };

const getMe = async (jwtData: JwtPayload) => {
  return prisma.user.findUnique({
    where: { id: jwtData.id },
  });
};

const generateAccessToken = async (token: string) => {
  let decoded: JwtPayload;

  try {
    decoded = jwtHelper.decodedToken(token, config.jwt_refresh_secret!);
  } catch {
    throw new AppError(status.BAD_REQUEST, "Invalid token");
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user) throw new AppError(status.BAD_REQUEST, "User does not exist");
  if (user.status !== UserStatus.ACTIVE)
    throw new AppError(status.BAD_REQUEST, "User is not active");

  const jwtData = buildJwtPayload(user);

  return {
    accessToken: jwtHelper.generateToken(
      jwtData,
      config.jwt_access_secret!,
      config.jwt_access_expires_in!,
    ),
  };
};

export const authServices = {
  loginUser,
  registerNewUser,
  getMe,
  generateAccessToken,
};
