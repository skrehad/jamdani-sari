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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { images } = payload, productData = __rest(payload, ["images"]);
    const result = yield prismaProvider_1.default.product.create({
        data: Object.assign(Object.assign({}, productData), { images: {
                create: images === null || images === void 0 ? void 0 : images.map((img) => ({
                    url: img.url,
                    type: img.type,
                })),
            } }),
        include: { images: true },
    });
    return result;
});
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.product.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });
    return result;
});
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.product.findUnique({
        where: { id },
        include: { images: true },
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    return result;
});
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prismaProvider_1.default.product.findUnique({
        where: { id },
    });
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    const result = yield prismaProvider_1.default.product.update({
        where: { id },
        data: payload,
    });
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prismaProvider_1.default.product.findUnique({ where: { id } });
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    yield prismaProvider_1.default.productImage.deleteMany({
        where: { productId: id },
    });
    const result = yield prismaProvider_1.default.product.delete({
        where: { id },
    });
    return result;
});
exports.productServices = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
