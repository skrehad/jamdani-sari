import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import fs from "fs";
import AppError from "../errors/AppError";
import status from "http-status";
import path from "path";
import { IFile } from "../types/file.type";

cloudinary.config({
  cloud_name: config.cloudnary_cloud_name,
  api_key: config.cloudnary_api_key,
  api_secret: config.cloudnary_api_secret,
});

const imageUploader = async (file: IFile) => {
  try {
    // ✅ Windows-safe absolute path
    const filePath = path.resolve(file.path);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });

    fs.unlinkSync(filePath); // cleanup
    return result;
  } catch (error: any) {
    console.error("❌ Cloudinary Upload Error:", error);
    throw new AppError(status.BAD_REQUEST, "Image upload failed");
  }
};

export default imageUploader;
