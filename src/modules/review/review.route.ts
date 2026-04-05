import { Router } from "express";
import multer from "multer";
import validateRequest from "../../utils/validateRequest";
import { reviewValidation } from "./review.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { reviewController } from "./review.controller";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post(
  "/",
  auth(UserRole.USER),
  upload.single("image"), // 👈 input name MUST be "image"
  validateRequest(reviewValidation.createReviewSchema),
  reviewController.createReview,
);

router.get("/", reviewController.getAllReviews);

router.delete("/:id", auth(UserRole.ADMIN), reviewController.deleteReview);

export const reviewRoute = router;
