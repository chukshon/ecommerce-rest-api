import { Router } from "express";
import { createProduct } from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth";
import { errorHandler } from "../error-handler";

const productsRoutes: Router = Router();

productsRoutes.post("/", errorHandler(createProduct));

export default productsRoutes;
