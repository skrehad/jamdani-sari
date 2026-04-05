import { Router } from "express";
import { categoryControllers } from "./category.controller";

const route = Router();

route.get("/all", categoryControllers.getAllCategories);

export const categoryRoute = route;
