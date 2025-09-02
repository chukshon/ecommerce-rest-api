import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  listAddress,
} from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";
import { errorHandler } from "../error-handler";

const usersRoutes: Router = Router();

usersRoutes.post(
  "/address",
  [authMiddleware, adminMiddleware],
  errorHandler(addAddress)
);
usersRoutes.delete(
  "/address/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(deleteAddress)
);
usersRoutes.get(
  "/address",
  [authMiddleware, adminMiddleware],
  errorHandler(listAddress)
);

export default usersRoutes;
