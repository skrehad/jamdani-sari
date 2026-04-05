import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { productValidation } from "./product.validation";
import { productControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { upload } from "../../middlewares/multerUpload";

const route = Router();

route.post(
  "/",
  auth(UserRole.ADMIN),
  upload.array("images", 7), // Multer handles file parsing
  validateRequest(productValidation.createProductSchema),
  productControllers.createProduct,
);

route.get("/", productControllers.getAllProducts);

route.get("/:id", productControllers.getSingleProduct);

route.patch(
  "/:id",
  auth(UserRole.ADMIN),
  validateRequest(productValidation.updateProductSchema),
  productControllers.updateProduct,
);

route.delete("/:id", auth(UserRole.ADMIN), productControllers.deleteProduct);

export const productRoute = route;
