"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const product_route_1 = require("../modules/product/product.route");
const wishlist_route_1 = require("../modules/wishlist/wishlist.route");
const user_route_1 = require("../modules/user/user.route");
const order_route_1 = require("../modules/order/order.route");
const preOrder_route_1 = require("../modules/preOrder/preOrder.route");
const gallery_route_1 = require("../modules/gallery/gallery.route");
const review_route_1 = require("../modules/review/review.route");
const dashboard_route_1 = require("../modules/dashboard/dashboard.route");
const route = (0, express_1.Router)();
const modules = [
    { path: "/auth", route: auth_route_1.authRoute },
    { path: "/user", route: user_route_1.userRoute },
    { path: "/product", route: product_route_1.productRoute },
    { path: "/wishlist", route: wishlist_route_1.wishlistRoute },
    { path: "/order", route: order_route_1.orderRoute },
    { path: "/pre-order", route: preOrder_route_1.preOrderRoute },
    { path: "/dashboard", route: dashboard_route_1.dashboardRoute },
    { path: "/gallery", route: gallery_route_1.galleryRoute },
    { path: "/review", route: review_route_1.reviewRoute },
];
modules.forEach((module) => {
    route.use(module.path, module.route);
});
exports.default = route;
