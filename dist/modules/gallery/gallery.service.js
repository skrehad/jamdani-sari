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
exports.galleryService = void 0;
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const imageUploader_1 = __importDefault(require("../../utils/imageUploader"));
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const fileData = {
        path: file.path,
        originalname: file.originalname,
        mimetype: file.mimetype,
    };
    const result = yield (0, imageUploader_1.default)(fileData);
    // Save to DB
    const gallery = yield prismaProvider_1.default.gallery.create({
        data: {
            url: result.secure_url,
            publicId: result.public_id,
        },
    });
    return gallery;
});
const getAllImages = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaProvider_1.default.gallery.findMany({
        orderBy: { createdAt: "desc" },
    });
});
exports.galleryService = { uploadImage, getAllImages };
