import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../utils/validateRequest";
import { orderControllers } from "./order.controller";
import { orderValidation } from "./order.validation";

const route = Router();

route.post(
  "/",
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(orderValidation.createOrderSchema),
  orderControllers.createOrder,
);

// route.get("/", auth(UserRole.ADMIN), orderControllers.getAllOrders);
route.get("/", orderControllers.getAllOrders);

route.get(
  "/my-orders",
  auth(UserRole.USER, UserRole.ADMIN),
  orderControllers.getMyOrders,
);

route.get(
  "/:id",
  auth(UserRole.USER, UserRole.ADMIN),
  orderControllers.getSingleOrder,
);

route.patch(
  "/status/:id",
  auth(UserRole.ADMIN),
  validateRequest(orderValidation.updateOrderStatusSchema),
  orderControllers.updateOrderStatus,
);

route.delete(
  "/:id",
  auth(UserRole.USER, UserRole.ADMIN),
  orderControllers.deleteOrder,
);
// route.delete("/:id", orderControllers.deleteOrder);

export const orderRoute = route;
