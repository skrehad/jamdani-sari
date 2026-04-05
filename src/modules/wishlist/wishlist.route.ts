import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { wishlistValidation } from "./wishlist.validation";
import { wishlistControllers } from "./wishlist.controller";

const route = Router();

route.post(
  "/",
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(wishlistValidation.addToWishlistSchema),
  wishlistControllers.addToWishlist,
);

route.get(
  "/my-wishlist",
  auth(UserRole.USER),
  wishlistControllers.getMyWishlist,
);

route.get(
  "/",
  auth(UserRole.USER, UserRole.ADMIN),
  wishlistControllers.getAllWishlist,
);

route.delete(
  "/:id",
  auth(UserRole.USER, UserRole.ADMIN),
  wishlistControllers.removeFromWishlist,
);

export const wishlistRoute = route;
