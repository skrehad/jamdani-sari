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
exports.dashboardRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const route = (0, express_1.Router)();
route.get("/user", (0, auth_1.default)(client_1.UserRole.USER), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId)
            return res.status(401).json({ error: "Not authenticated" });
        // Orders count
        const ordersCount = yield prismaProvider_1.default.order.count({ where: { userId } });
        // Wishlist count
        const wishlistCount = yield prismaProvider_1.default.wishlist.count({ where: { userId } });
        // PreOrders count (products with status PRE_ORDER)
        const preOrdersCount = yield prismaProvider_1.default.order.count({
            where: {
                userId,
                items: { some: { product: { status: "PRE_ORDER" } } },
            },
        });
        // Reviews count (adjust according to your schema)
        const reviewsCount = yield prismaProvider_1.default.review.count({
            where: { username: userId },
        });
        res
            .status(200)
            .json({ ordersCount, wishlistCount, preOrdersCount, reviewsCount });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}));
route.get("/admin", (0, auth_1.default)(client_1.UserRole.ADMIN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Total Users
        const totalUsers = yield prismaProvider_1.default.user.count();
        // Total Orders
        const totalOrders = yield prismaProvider_1.default.order.count();
        // Total Products
        const totalProducts = yield prismaProvider_1.default.product.count();
        // Total Reviews
        const totalReviews = yield prismaProvider_1.default.review.count();
        res
            .status(200)
            .json({ totalUsers, totalOrders, totalProducts, totalReviews });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}));
exports.dashboardRoute = route;
