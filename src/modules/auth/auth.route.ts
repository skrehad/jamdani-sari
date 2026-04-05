import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../utils/validateRequest";
import { authValidation } from "./auth.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const route = Router();

route.post(
  "/login",
  validateRequest(authValidation.loginValidationSchema),
  authControllers.loginUser,
);

route.post(
  "/register",
  validateRequest(authValidation.registrationValidationSchema),
  authControllers.registerNewUser,
);
route.get(
  "/get-me",
  auth(UserRole.ADMIN, UserRole.USER),
  authControllers.getMe,
);
route.post("/generate-access-token", authControllers.generateAccessToken);

export const authRoute = route;
