"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const route = (0, express_1.Router)();
route.get("/all", category_controller_1.categoryControllers.getAllCategories);
exports.categoryRoute = route;
