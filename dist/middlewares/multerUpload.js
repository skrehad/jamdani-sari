"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(process.cwd(), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
exports.upload = (0, multer_1.default)({
    storage,
    // limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    limits: {
        fileSize: 10 * 1024 * 1024, // 🔥 10MB per image
        files: 7, // 🔥 maximum 7 files
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            // ✅ Pass error as the first argument, TypeScript will accept it
            return cb(new Error("Only image files are allowed"), false);
            // or simpler: cb(new Error("Only image files are allowed") as unknown as null, false);  // workaround
        }
        cb(null, true);
    },
});
