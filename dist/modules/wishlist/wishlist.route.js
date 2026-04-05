"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const wishlist_validation_1 = require("./wishlist.validation");
const wishlist_controller_1 = require("./wishlist.controller");
const route = (0, express_1.Router)();
route.post("/", (0, auth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(wishlist_validation_1.wishlistValidation.addToWishlistSchema), wishlist_controller_1.wishlistControllers.addToWishlist);
route.get("/my-wishlist", (0, auth_1.default)(client_1.UserRole.USER), wishlist_controller_1.wishlistControllers.getMyWishlist);
route.get("/", (0, auth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), wishlist_controller_1.wishlistControllers.getAllWishlist);
route.delete("/:id", (0, auth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), wishlist_controller_1.wishlistControllers.removeFromWishlist);
exports.wishlistRoute = route;
