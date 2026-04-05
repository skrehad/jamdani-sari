import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { orderServices } from "./order.service";
import AppError from "../../errors/AppError";
import prisma from "../../utils/prismaProvider";

const createOrder = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new AppError(status.UNAUTHORIZED, "User not authenticated");
  }

  const userId = req.user.id; // ✅ guaranteed

  const result = await orderServices.createOrder(userId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await orderServices.getAllOrders();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Orders fetched successfully",
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const result = await orderServices.getSingleOrder(req.params.id as string);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Order fetched successfully",
    data: result,
  });
});

const getMyOrders = catchAsync(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError(status.UNAUTHORIZED, "User not authenticated");
  }

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } }, user: true },
    orderBy: { createdAt: "desc" },
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Fetched your orders successfully",
    data: orders,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const result = await orderServices.updateOrderStatus(
    req.params.id as string,
    req.body.status,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Order status updated successfully",
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const result = await orderServices.deleteOrder(req.params.id as string);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Order deleted successfully",
    data: result,
  });
});

export const orderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
};
