import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { galleryService } from "./gallery.service";

const uploadImage = catchAsync(async (req, res) => {
  const file = req.file;
  if (!file) throw new Error("No file provided");

  const result = await galleryService.uploadImage(file);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Image uploaded successfully",
    data: result,
  });
});

const getAllImages = catchAsync(async (req, res) => {
  const images = await galleryService.getAllImages();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Images fetched successfully",
    data: images,
  });
});

export const galleryController = { uploadImage, getAllImages };
