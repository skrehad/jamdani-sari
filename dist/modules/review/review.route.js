"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoute = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const review_validation_1 = require("./review.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const review_controller_1 = require("./review.controller");
const upload = (0, multer_1.default)({ dest: "uploads/" });
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(client_1.UserRole.USER), upload.single("image"), // 👈 input name MUST be "image"
(0, validateRequest_1.default)(review_validation_1.reviewValidation.createReviewSchema), review_controller_1.reviewController.createReview);
router.get("/", review_controller_1.reviewController.getAllReviews);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), review_controller_1.reviewController.deleteReview);
exports.reviewRoute = router;
