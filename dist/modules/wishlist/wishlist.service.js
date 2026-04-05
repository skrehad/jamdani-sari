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
exports.wishlistServices = void 0;
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const client_1 = require("@prisma/client");
const addToWishlist = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prismaProvider_1.default.product.findUnique({ where: { id: productId } });
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    const alreadyExist = yield prismaProvider_1.default.wishlist.findFirst({
        where: { userId, productId },
    });
    if (alreadyExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Already added to wishlist");
    }
    const result = yield prismaProvider_1.default.wishlist.create({
        data: {
            userId,
            productId,
        },
        include: { product: true },
    });
    return result;
});
const getAllWishlist = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaProvider_1.default.wishlist.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            product: {
                include: {
                    images: true,
                },
            },
        },
        // orderBy: { createdAt: "desc" },
    });
});
const getMyWishlist = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaProvider_1.default.wishlist.findMany({
        where: { userId },
        include: {
            product: {
                include: {
                    images: true,
                },
            },
        },
        // orderBy: { createdAt: "desc" },
    });
});
// const removeFromWishlist = async (userId: string, wishlistId: string) => {
//   // Check if wishlist item exists and belongs to the user
//   const item = await prisma.wishlist.findFirst({
//     where: { id: wishlistId, userId },
//   });
//   if (!item) throw new AppError(status.NOT_FOUND, "Wishlist item not found");
//   // Delete the item
//   return await prisma.wishlist.delete({ where: { id: wishlistId } });
// };
const removeFromWishlist = (userId, wishlistId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let item;
    if (role === client_1.UserRole.ADMIN) {
        // Admin can delete any wishlist item
        item = yield prismaProvider_1.default.wishlist.findUnique({
            where: { id: wishlistId },
        });
    }
    else {
        // User can delete only their own wishlist
        item = yield prismaProvider_1.default.wishlist.findFirst({
            where: { id: wishlistId, userId },
        });
    }
    if (!item)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Wishlist item not found");
    return yield prismaProvider_1.default.wishlist.delete({
        where: { id: wishlistId },
    });
});
exports.wishlistServices = {
    addToWishlist,
    getAllWishlist,
    getMyWishlist,
    removeFromWishlist,
};
