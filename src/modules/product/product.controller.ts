import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productServices } from "./product.service";
import imageUploader from "../../utils/imageUploader";
import { Request, Response } from "express";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const imageTypes: string[] = req.body.imageTypes || [];

  const price = Number(req.body.price);
  const discount = req.body.discount ? Number(req.body.discount) : 0;

  // ✅ Ensure exactly 3 images
  if (!files || files.length < 4 || files.length > 7) {
    return res.status(400).json({
      message: "Minimum 4 and maximum 7 images are required",
    });
  }

  if (!imageTypes || imageTypes.length < 4 || imageTypes.length > 7) {
    return res.status(400).json({
      message: "Minimum 4 and maximum 7 image types are required",
    });
  }

  // ✅ Upload images to Cloudinary
  const uploadedImages = await Promise.all(
    files.map(async (file, index) => {
      const result = await imageUploader({
        path: file.path,
        originalname: file.originalname,
        mimetype: file.mimetype,
      });

      return {
        url: result.secure_url, // Cloudinary URL
        type: imageTypes[index],
      };
    }),
  );

  // ✅ Build payload for Prisma
  const payload = {
    ...req.body,
    price,
    discount,
    totalPrice: price - discount, // ✅ SAFEST
    stock: Number(req.body.stock),
    images: uploadedImages,
  };

  delete payload.imageTypes; // Prisma doesn't need this

  // ✅ Create product in database
  const result = await productServices.createProduct(payload);

  // ✅ Map images to only URLs for frontend
  const response = {
    ...result,
    images: result.images.map((img) => img.url),
  };

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully",
    data: response,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllProducts();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const id = req.params.id as string;

  const result = await productServices.getSingleProduct(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await productServices.updateProduct(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await productServices.deleteProduct(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
