"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const addToWishlistSchema = zod_1.default.object({
    body: zod_1.default.object({
        productId: zod_1.default.string({ required_error: "Product ID is required" }),
    }),
});
const removeFromWishlistSchema = zod_1.default.object({
    body: zod_1.default.object({
        productId: zod_1.default.string({ required_error: "Product ID is required" }),
    }),
});
exports.wishlistValidation = {
    addToWishlistSchema,
    removeFromWishlistSchema,
};
