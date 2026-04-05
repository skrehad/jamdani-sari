import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../utils/validateRequest";
import { preOrderValidation } from "./preOrder.validation";
import { preOrderControllers } from "./preOrder.controller";

const route = Router();

route.post(
  "/create",
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(preOrderValidation.createPreOrderSchema),
  preOrderControllers.createPreOrder,
);

route.get("/", auth(UserRole.ADMIN), preOrderControllers.getAllPreOrders);
// route.get("/", preOrderControllers.getAllPreOrders);

route.get(
  "/my-pre-orders",
  auth(UserRole.USER),
  preOrderControllers.getMyPreOrders,
);

route.get(
  "/:id",
  auth(UserRole.USER, UserRole.ADMIN),
  preOrderControllers.getSinglePreOrder,
);

// route.delete("/:id", preOrderControllers.deletePreOrder);
route.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.USER),
  preOrderControllers.deletePreOrder,
);

export const preOrderRoute = route;
