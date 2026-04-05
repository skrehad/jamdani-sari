"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleryRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const multer_1 = __importDefault(require("multer"));
const gallery_controller_1 = require("./gallery.controller");
const route = (0, express_1.Router)();
// Multer setup for temporary file storage
// const upload = multer({ dest: "uploads/" });
const upload = (0, multer_1.default)({ dest: "uploads/" });
upload.single("image");
route.post("/upload", (0, auth_1.default)(client_1.UserRole.ADMIN), upload.single("image"), gallery_controller_1.galleryController.uploadImage);
// route.get("/",  galleryController.getAllImages);
route.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), gallery_controller_1.galleryController.getAllImages);
exports.galleryRoute = route;
