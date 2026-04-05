import prisma from "../../utils/prismaProvider";
import AppError from "../../errors/AppError";
import status from "http-status";

const createPreOrder = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  if (!userId) {
    throw new AppError(status.UNAUTHORIZED, "User ID missing");
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product || product.status !== "PRE_ORDER") {
    throw new AppError(
      status.BAD_REQUEST,
      "Product not available for preOrder",
    );
  }

  return prisma.order.create({
    data: {
      userId,
      totalPrice: product.price * quantity,
      status: "PENDING",
      items: {
        create: [
          {
            productId,
            quantity,
            price: product.price * quantity,
          },
        ],
      },
    },
    include: {
      items: { include: { product: true } },
    },
  });
};

const getAllPreOrders = async () => {
  return await prisma.order.findMany({
    where: { items: { some: { product: { status: "PRE_ORDER" } } } },
    include: { items: { include: { product: true } }, user: true },
    orderBy: { createdAt: "desc" },
  });
};

const getSinglePreOrder = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      user: true,
    },
  });

  if (!order) {
    throw new AppError(status.NOT_FOUND, "PreOrder not found");
  }

  return order;
};

// const getMyPreOrders = async (userId: string) => {
//   return await prisma.order.findMany({
//     where: { userId },
//     include: {
//       items: { include: { product: { include: { images: true } } } },
//     },
//     orderBy: { createdAt: "desc" }, // newest first
//   });
// };

const getMyPreOrders = async (userId: string) => {
  return await prisma.order.findMany({
    where: {
      userId,
      items: {
        some: {
          product: {
            status: "PRE_ORDER",
          },
        },
      },
    },
    include: {
      items: {
        include: {
          product: {
            include: { images: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const deletePreOrder = async (id: string) => {
  const order = await prisma.order.findUnique({ where: { id } });

  if (!order) {
    throw new AppError(status.NOT_FOUND, "PreOrder not found");
  }

  await prisma.orderItem.deleteMany({
    where: { orderId: id },
  });

  return prisma.order.delete({
    where: { id },
  });
};

export const preOrderServices = {
  createPreOrder,
  getAllPreOrders,
  getSinglePreOrder,
  getMyPreOrders,
  deletePreOrder,
};
