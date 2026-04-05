import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { productRoute } from "../modules/product/product.route";
import { wishlistRoute } from "../modules/wishlist/wishlist.route";
import { userRoute } from "../modules/user/user.route";
import { orderRoute } from "../modules/order/order.route";
import { preOrderRoute } from "../modules/preOrder/preOrder.route";
import { galleryRoute } from "../modules/gallery/gallery.route";
import { reviewRoute } from "../modules/review/review.route";
import { dashboardRoute } from "../modules/dashboard/dashboard.route";

const route = Router();

const modules = [
  { path: "/auth", route: authRoute },
  { path: "/user", route: userRoute },
  { path: "/product", route: productRoute },
  { path: "/wishlist", route: wishlistRoute },
  { path: "/order", route: orderRoute },
  { path: "/pre-order", route: preOrderRoute },
  { path: "/dashboard", route: dashboardRoute },
  { path: "/gallery", route: galleryRoute },
  { path: "/review", route: reviewRoute },
];

modules.forEach((module) => {
  route.use(module.path, module.route);
});

export default route;
