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
exports.preOrderServices = void 0;
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createPreOrder = (userId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User ID missing");
    }
    const product = yield prismaProvider_1.default.product.findUnique({
        where: { id: productId },
    });
    if (!product || product.status !== "PRE_ORDER") {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product not available for preOrder");
    }
    return prismaProvider_1.default.order.create({
        data: {
            userId,
            totalPrice: product.price * quantity,
            status: "PENDING",
            items: {
                create: [
                    {
                        productId,
                        quantity,
                        price: product.price * quantity,
                    },
                ],
            },
        },
        include: {
            items: { include: { product: true } },
        },
    });
});
const getAllPreOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaProvider_1.default.order.findMany({
        where: { items: { some: { product: { status: "PRE_ORDER" } } } },
        include: { items: { include: { product: true } }, user: true },
        orderBy: { createdAt: "desc" },
    });
});
const getSinglePreOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prismaProvider_1.default.order.findUnique({
        where: { id },
        include: {
            items: { include: { product: true } },
            user: true,
        },
    });
    if (!order) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "PreOrder not found");
    }
    return order;
});
// const getMyPreOrders = async (userId: string) => {
//   return await prisma.order.findMany({
//     where: { userId },
//     include: {
//       items: { include: { product: { include: { images: true } } } },
//     },
//     orderBy: { createdAt: "desc" }, // newest first
//   });
// };
const getMyPreOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaProvider_1.default.order.findMany({
        where: {
            userId,
            items: {
                some: {
                    product: {
                        status: "PRE_ORDER",
                    },
                },
            },
        },
        include: {
            items: {
                include: {
                    product: {
                        include: { images: true },
                    },
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
});
const deletePreOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prismaProvider_1.default.order.findUnique({ where: { id } });
    if (!order) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "PreOrder not found");
    }
    yield prismaProvider_1.default.orderItem.deleteMany({
        where: { orderId: id },
    });
    return prismaProvider_1.default.order.delete({
        where: { id },
    });
});
exports.preOrderServices = {
    createPreOrder,
    getAllPreOrders,
    getSinglePreOrder,
    getMyPreOrders,
    deletePreOrder,
};
