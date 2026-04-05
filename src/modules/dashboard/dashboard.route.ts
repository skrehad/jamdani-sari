import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import prisma from "../../utils/prismaProvider";

const route = Router();

route.get("/user", auth(UserRole.USER), async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    // Orders count
    const ordersCount = await prisma.order.count({ where: { userId } });

    // Wishlist count
    const wishlistCount = await prisma.wishlist.count({ where: { userId } });

    // PreOrders count (products with status PRE_ORDER)
    const preOrdersCount = await prisma.order.count({
      where: {
        userId,
        items: { some: { product: { status: "PRE_ORDER" } } },
      },
    });

    // Reviews count (adjust according to your schema)
    const reviewsCount = await prisma.review.count({
      where: { username: userId },
    });

    res
      .status(200)
      .json({ ordersCount, wishlistCount, preOrdersCount, reviewsCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
route.get("/admin", auth(UserRole.ADMIN), async (req, res) => {
  try {
    // Total Users
    const totalUsers = await prisma.user.count();

    // Total Orders
    const totalOrders = await prisma.order.count();

    // Total Products
    const totalProducts = await prisma.product.count();

    // Total Reviews
    const totalReviews = await prisma.review.count();

    res
      .status(200)
      .json({ totalUsers, totalOrders, totalProducts, totalReviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export const dashboardRoute = route;
