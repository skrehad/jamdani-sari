import prisma from "../../utils/prismaProvider";

const createReview = async (payload: {
  username: string;
  rating: number;
  comment: string;
  image: string;
}) => {
  return await prisma.review.create({
    data: payload,
  });
};

const getAllReviews = async () => {
  return await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const deleteReview = async (id: string) => {
  return await prisma.review.delete({
    where: { id },
  });
};

export const reviewService = {
  createReview,
  getAllReviews,
  deleteReview,
};
