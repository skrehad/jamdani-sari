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
exports.userServices = void 0;
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.user.findMany({
        orderBy: { createdAt: "desc" },
    });
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.user.findUnique({
        where: { id },
        include: {
            orders: {
                include: { items: true },
            },
        },
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prismaProvider_1.default.user.findUnique({
        where: { id },
    });
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield prismaProvider_1.default.user.update({
        where: { id },
        data: payload,
    });
    return result;
});
const changeUserStatus = (id, statusValue) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prismaProvider_1.default.user.findUnique({ where: { id } });
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield prismaProvider_1.default.user.update({
        where: { id },
        data: { status: statusValue },
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prismaProvider_1.default.user.findUnique({ where: { id } });
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield prismaProvider_1.default.user.update({
        where: { id },
        data: { status: "DELETED" },
    });
    return result;
});
exports.userServices = {
    getAllUsers,
    getSingleUser,
    updateUser,
    changeUserStatus,
    deleteUser,
};
