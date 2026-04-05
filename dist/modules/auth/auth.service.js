"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const bcryptHelper_1 = require("../../utils/bcryptHelper");
const jwtHelper_1 = require("../../utils/jwtHelper");
const config_1 = __importDefault(require("../../config"));
const client_1 = require("@prisma/client");
const buildJwtPayload = (user) => ({
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaProvider_1.default.user.findUnique({
        where: { email: payload.email },
    });
    if (!user)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User does not exist");
    const isPasswordMatch = yield bcryptHelper_1.bcryptHelper.comparePassword(payload.password, user.password);
    if (!isPasswordMatch)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password does not match");
    const jwtData = buildJwtPayload(user);
    return {
        accessToken: jwtHelper_1.jwtHelper.generateToken(jwtData, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in),
        refreshToken: jwtHelper_1.jwtHelper.generateToken(jwtData, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in),
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
});
const registerNewUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prismaProvider_1.default.user.findUnique({
        where: { email: payload.email },
    });
    if (isUserExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User already exist");
    }
    const hashedPassword = yield bcryptHelper_1.bcryptHelper.hashPassword(payload.password);
    const user = yield prismaProvider_1.default.user.create({
        data: {
            name: payload.fullName,
            phone: payload.phone,
            email: payload.email,
            password: hashedPassword,
        },
    });
    const jwtData = buildJwtPayload(user);
    return {
        accessToken: jwtHelper_1.jwtHelper.generateToken(jwtData, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in),
        refreshToken: jwtHelper_1.jwtHelper.generateToken(jwtData, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in),
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role || "USER", // default role
        },
    };
});
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
const getMe = (jwtData) => __awaiter(void 0, void 0, void 0, function* () {
    return prismaProvider_1.default.user.findUnique({
        where: { id: jwtData.id },
    });
});
const generateAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decoded;
    try {
        decoded = jwtHelper_1.jwtHelper.decodedToken(token, config_1.default.jwt_refresh_secret);
    }
    catch (_a) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid token");
    }
    const user = yield prismaProvider_1.default.user.findUnique({
        where: { id: decoded.id },
    });
    if (!user)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User does not exist");
    if (user.status !== client_1.UserStatus.ACTIVE)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User is not active");
    const jwtData = buildJwtPayload(user);
    return {
        accessToken: jwtHelper_1.jwtHelper.generateToken(jwtData, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in),
    };
});
exports.authServices = {
    loginUser,
    registerNewUser,
    getMe,
    generateAccessToken,
};
