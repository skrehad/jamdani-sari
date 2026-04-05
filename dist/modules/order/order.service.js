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
exports.orderServices = void 0;
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let totalPrice = 0;
    const orderItems = [];
    for (const item of payload.items) {
        const product = yield prismaProvider_1.default.product.findUnique({
            where: { id: item.productId },
        });
        if (!product) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
        }
        const itemTotalPrice = product.price * item.quantity;
        totalPrice += itemTotalPrice;
        orderItems.push({
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
        });
    }
    const order = yield prismaProvider_1.default.order.create({
        data: {
            userId,
            totalPrice,
            status: "PENDING",
            items: {
                create: orderItems,
            },
        },
        include: { items: true },
    });
    return order;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaProvider_1.default.order.findMany({
        include: { items: { include: { product: true } }, user: true },
        orderBy: { createdAt: "desc" },
    });
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prismaProvider_1.default.order.findUnique({
        where: { id },
        include: { items: { include: { product: true } }, user: true },
    });
    if (!order)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    return order;
});
const getMyOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield prismaProvider_1.default.order.findMany({
        where: { userId },
        include: { items: { include: { product: true } }, user: true },
        orderBy: { createdAt: "desc" },
    });
    return orders;
});
const updateOrderStatus = (id, statusValue) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prismaProvider_1.default.order.findUnique({ where: { id } });
    if (!order)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    return yield prismaProvider_1.default.order.update({
        where: { id },
        data: { status: statusValue },
    });
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prismaProvider_1.default.order.findUnique({ where: { id } });
    if (!order)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    yield prismaProvider_1.default.orderItem.deleteMany({ where: { orderId: id } });
    return yield prismaProvider_1.default.order.delete({ where: { id } });
});
exports.orderServices = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    getMyOrders,
    updateOrderStatus,
    deleteOrder,
};
