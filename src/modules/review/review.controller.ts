import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import imageUploader from "../../utils/imageUploader";
import { reviewService } from "./review.service";
import AppError from "../../errors/AppError";

const createReview = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new AppError(400, "Image is required");
  }

  const { username, rating, comment } = req.body;

  const image = await imageUploader(req.file);

  const result = await reviewService.createReview({
    username,
    rating: Number(rating),
    comment,
    image: image.url,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await reviewService.getAllReviews();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Reviews fetched successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const result = await reviewService.deleteReview(req.params.id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Review deleted successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
  getAllReviews,
  deleteReview,
};
