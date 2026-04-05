import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../utils/validateRequest";
import { userControllers } from "./user.controller";
import { userValidation } from "./user.validation";

const route = Router();

route.get("/", auth(UserRole.ADMIN), userControllers.getAllUsers);
// route.get("/", userControllers.getAllUsers);

route.get("/:id", auth(UserRole.ADMIN), userControllers.getSingleUser);
// route.get("/:id", userControllers.getSingleUser);

route.patch(
  "/update/:id",
  auth(UserRole.ADMIN),
  validateRequest(userValidation.updateUserSchema),
  userControllers.updateUser,
);

route.patch(
  "/status/:id",
  auth(UserRole.ADMIN),
  validateRequest(userValidation.changeStatusSchema),
  userControllers.changeUserStatus,
);

route.delete("/delete/:id", auth(UserRole.ADMIN), userControllers.deleteUser);

export const userRoute = route;
