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
exports.productControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const product_service_1 = require("./product.service");
const imageUploader_1 = __importDefault(require("../../utils/imageUploader"));
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const imageTypes = req.body.imageTypes || [];
    const price = Number(req.body.price);
    const discount = req.body.discount ? Number(req.body.discount) : 0;
    // ✅ Ensure exactly 3 images
    if (!files || files.length < 4 || files.length > 7) {
        return res.status(400).json({
            message: "Minimum 4 and maximum 7 images are required",
        });
    }
    if (!imageTypes || imageTypes.length < 4 || imageTypes.length > 7) {
        return res.status(400).json({
            message: "Minimum 4 and maximum 7 image types are required",
        });
    }
    // ✅ Upload images to Cloudinary
    const uploadedImages = yield Promise.all(files.map((file, index) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, imageUploader_1.default)({
            path: file.path,
            originalname: file.originalname,
            mimetype: file.mimetype,
        });
        return {
            url: result.secure_url, // Cloudinary URL
            type: imageTypes[index],
        };
    })));
    // ✅ Build payload for Prisma
    const payload = Object.assign(Object.assign({}, req.body), { price,
        discount, totalPrice: price - discount, stock: Number(req.body.stock), images: uploadedImages });
    delete payload.imageTypes; // Prisma doesn't need this
    // ✅ Create product in database
    const result = yield product_service_1.productServices.createProduct(payload);
    // ✅ Map images to only URLs for frontend
    const response = Object.assign(Object.assign({}, result), { images: result.images.map((img) => img.url) });
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Product created successfully",
        data: response,
    });
}));
const getAllProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productServices.getAllProducts();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Products retrieved successfully",
        data: result,
    });
}));
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield product_service_1.productServices.getSingleProduct(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product retrieved successfully",
        data: result,
    });
}));
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield product_service_1.productServices.updateProduct(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product updated successfully",
        data: result,
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield product_service_1.productServices.deleteProduct(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product deleted successfully",
        data: result,
    });
}));
exports.productControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
