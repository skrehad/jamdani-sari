import prisma from "../../utils/prismaProvider";
import AppError from "../../errors/AppError";
import status from "http-status";
import { Product } from "@prisma/client";

const createProduct = async (payload: Product & { images?: any[] }) => {
  const { images, ...productData } = payload;

  const result = await prisma.product.create({
    data: {
      ...productData,
      images: {
        create: images?.map((img) => ({
          url: img.url,
          type: img.type,
        })),
      },
    },
    include: { images: true },
  });

  return result;
};

const getAllProducts = async () => {
  const result = await prisma.product.findMany({
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });
  return result;
};

const getSingleProduct = async (id: string) => {
  const result = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  return result;
};

const updateProduct = async (id: string, payload: Partial<Product>) => {
  const isExist = await prisma.product.findUnique({
    where: { id },
  });

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  const result = await prisma.product.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteProduct = async (id: string) => {
  const isExist = await prisma.product.findUnique({ where: { id } });

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  await prisma.productImage.deleteMany({
    where: { productId: id },
  });

  const result = await prisma.product.delete({
    where: { id },
  });

  return result;
};

export const productServices = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
