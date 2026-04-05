import prisma from "../../utils/prismaProvider";
import AppError from "../../errors/AppError";
import status from "http-status";
import { UserRole } from "@prisma/client";

const addToWishlist = async (userId: string, productId: string) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  const alreadyExist = await prisma.wishlist.findFirst({
    where: { userId, productId },
  });

  if (alreadyExist) {
    throw new AppError(status.BAD_REQUEST, "Already added to wishlist");
  }

  const result = await prisma.wishlist.create({
    data: {
      userId,
      productId,
    },
    include: { product: true },
  });

  return result;
};

const getAllWishlist = async () => {
  return await prisma.wishlist.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: {
        include: {
          images: true,
        },
      },
    },
    // orderBy: { createdAt: "desc" },
  });
};

const getMyWishlist = async (userId: string) => {
  return await prisma.wishlist.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          images: true,
        },
      },
    },
    // orderBy: { createdAt: "desc" },
  });
};

// const removeFromWishlist = async (userId: string, wishlistId: string) => {
//   // Check if wishlist item exists and belongs to the user
//   const item = await prisma.wishlist.findFirst({
//     where: { id: wishlistId, userId },
//   });

//   if (!item) throw new AppError(status.NOT_FOUND, "Wishlist item not found");

//   // Delete the item
//   return await prisma.wishlist.delete({ where: { id: wishlistId } });
// };

const removeFromWishlist = async (
  userId: string,
  wishlistId: string,
  role: string,
) => {
  let item;

  if (role === UserRole.ADMIN) {
    // Admin can delete any wishlist item
    item = await prisma.wishlist.findUnique({
      where: { id: wishlistId },
    });
  } else {
    // User can delete only their own wishlist
    item = await prisma.wishlist.findFirst({
      where: { id: wishlistId, userId },
    });
  }

  if (!item) throw new AppError(status.NOT_FOUND, "Wishlist item not found");

  return await prisma.wishlist.delete({
    where: { id: wishlistId },
  });
};

export const wishlistServices = {
  addToWishlist,
  getAllWishlist,
  getMyWishlist,
  removeFromWishlist,
};
