import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import multer from "multer";
import { galleryController } from "./gallery.controller";

const route = Router();

// Multer setup for temporary file storage
// const upload = multer({ dest: "uploads/" });
const upload = multer({ dest: "uploads/" });
upload.single("image");

route.post(
  "/upload",
  auth(UserRole.ADMIN),
  upload.single("image"),
  galleryController.uploadImage,
);

// route.get("/",  galleryController.getAllImages);
route.get("/", auth(UserRole.ADMIN), galleryController.getAllImages);

export const galleryRoute = route;
