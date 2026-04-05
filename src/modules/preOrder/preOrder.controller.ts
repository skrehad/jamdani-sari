import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { preOrderServices } from "./preOrder.service";
import AppError from "../../errors/AppError";

const createPreOrder = catchAsync(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError(status.UNAUTHORIZED, "User not authenticated");
  }

  const { productId, quantity } = req.body;

  const result = await preOrderServices.createPreOrder(
    userId,
    productId,
    quantity,
  );

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "PreOrder created successfully",
    data: result,
  });
});

const getAllPreOrders = catchAsync(async (req, res) => {
  const result = await preOrderServices.getAllPreOrders();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "PreOrders fetched successfully",
    data: result,
  });
});

const getSinglePreOrder = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await preOrderServices.getSinglePreOrder(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "PreOrder fetched successfully",
    data: result,
  });
});

const getMyPreOrders = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("User not authenticated");

  const orders = await preOrderServices.getMyPreOrders(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Fetched user pre-orders successfully",
    data: orders,
  });
});

const deletePreOrder = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await preOrderServices.deletePreOrder(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "PreOrder deleted successfully",
    data: result,
  });
});

export const preOrderControllers = {
  createPreOrder,
  getAllPreOrders,
  getSinglePreOrder,
  getMyPreOrders,
  deletePreOrder,
};
