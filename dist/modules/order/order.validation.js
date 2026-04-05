"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createOrderSchema = zod_1.default.object({
    body: zod_1.default.object({
        items: zod_1.default.array(zod_1.default.object({
            productId: zod_1.default.string({ required_error: "Product ID required" }),
            quantity: zod_1.default.number({ required_error: "Quantity required" }),
        })),
        addressId: zod_1.default.string({ required_error: "Address ID required" }),
    }),
});
const updateOrderStatusSchema = zod_1.default.object({
    body: zod_1.default.object({
        status: zod_1.default.enum(["PENDING", "SHIPPED", "DELIVERED"]),
    }),
});
exports.orderValidation = {
    createOrderSchema,
    updateOrderStatusSchema,
};
