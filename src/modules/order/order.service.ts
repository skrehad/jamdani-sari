import prisma from "../../utils/prismaProvider";
import AppError from "../../errors/AppError";
import status from "http-status";

const createOrder = async (userId: string, payload: any) => {
  let totalPrice = 0;

  const orderItems = [];

  for (const item of payload.items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });

    if (!product) {
      throw new AppError(status.NOT_FOUND, "Product not found");
    }

    const itemTotalPrice = product.price * item.quantity;
    totalPrice += itemTotalPrice;

    orderItems.push({
      productId: item.productId,
      quantity: item.quantity,
      price: product.price,
    });
  }

  const order = await prisma.order.create({
    data: {
      userId,
      totalPrice,
      status: "PENDING",
      items: {
        create: orderItems,
      },
    },
    include: { items: true },
  });

  return order;
};

const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: { items: { include: { product: true } }, user: true },
    orderBy: { createdAt: "desc" },
  });
};

const getSingleOrder = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } }, user: true },
  });

  if (!order) throw new AppError(status.NOT_FOUND, "Order not found");
  return order;
};

const getMyOrders = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } }, user: true },
    orderBy: { createdAt: "desc" },
  });

  return orders;
};

const updateOrderStatus = async (id: string, statusValue: string) => {
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) throw new AppError(status.NOT_FOUND, "Order not found");

  return await prisma.order.update({
    where: { id },
    data: { status: statusValue as any },
  });
};

const deleteOrder = async (id: string) => {
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) throw new AppError(status.NOT_FOUND, "Order not found");

  await prisma.orderItem.deleteMany({ where: { orderId: id } });
  return await prisma.order.delete({ where: { id } });
};

export const orderServices = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
};
