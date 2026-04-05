import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { wishlistServices } from "./wishlist.service";
import AppError from "../../errors/AppError";

const addToWishlist = catchAsync(async (req, res) => {
  const userId = req.user?.id as string;
  const { productId } = req.body;

  const result = await wishlistServices.addToWishlist(userId, productId);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Added to wishlist successfully",
    data: result,
  });
});

const getAllWishlist = catchAsync(async (_req, res) => {
  const result = await wishlistServices.getAllWishlist();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All wishlists fetched successfully",
    data: result,
  });
});

const getMyWishlist = catchAsync(async (req, res) => {
  const userId = req.user?.id as string;

  const result = await wishlistServices.getMyWishlist(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My wishlist fetched successfully",
    data: result,
  });
});

const removeFromWishlist = catchAsync(async (req, res) => {
  const userId = req.user?.id as string;
  const role = req.user?.role as string;
  const wishlistId = req.params.id;

  const result = await wishlistServices.removeFromWishlist(
    userId,
    wishlistId as string,
    role,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Removed from wishlist successfully",
    data: result,
  });
});

export const wishlistControllers = {
  addToWishlist,
  getAllWishlist,
  getMyWishlist,
  removeFromWishlist,
};
