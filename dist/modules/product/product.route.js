"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const product_validation_1 = require("./product.validation");
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const multerUpload_1 = require("../../middlewares/multerUpload");
const route = (0, express_1.Router)();
route.post("/", (0, auth_1.default)(client_1.UserRole.ADMIN), multerUpload_1.upload.array("images", 7), // Multer handles file parsing
(0, validateRequest_1.default)(product_validation_1.productValidation.createProductSchema), product_controller_1.productControllers.createProduct);
route.get("/", product_controller_1.productControllers.getAllProducts);
route.get("/:id", product_controller_1.productControllers.getSingleProduct);
route.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(product_validation_1.productValidation.updateProductSchema), product_controller_1.productControllers.updateProduct);
route.delete("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), product_controller_1.productControllers.deleteProduct);
exports.productRoute = route;
