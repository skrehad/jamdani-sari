"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const updateUserSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().optional(),
        phone: zod_1.default.string().optional(),
    }),
});
const changeStatusSchema = zod_1.default.object({
    body: zod_1.default.object({
        status: zod_1.default.enum(["ACTIVE", "BLOCKED", "DELETED"]),
    }),
});
exports.userValidation = {
    updateUserSchema,
    changeStatusSchema,
};
