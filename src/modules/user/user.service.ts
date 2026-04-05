import prisma from "../../utils/prismaProvider";
import AppError from "../../errors/AppError";
import status from "http-status";

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
    include: {
      orders: {
        include: { items: true },
      },
    },
  });

  if (!result) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  return result;
};

const updateUser = async (id: string, payload: any) => {
  const isExist = await prisma.user.findUnique({
    where: { id },
  });

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });

  return result;
};

const changeUserStatus = async (id: string, statusValue: string) => {
  const isExist = await prisma.user.findUnique({ where: { id } });

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const result = await prisma.user.update({
    where: { id },
    data: { status: statusValue as any },
  });

  return result;
};

const deleteUser = async (id: string) => {
  const isExist = await prisma.user.findUnique({ where: { id } });

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const result = await prisma.user.update({
    where: { id },
    data: { status: "DELETED" },
  });

  return result;
};

export const userServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
  changeUserStatus,
  deleteUser,
};
