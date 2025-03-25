import { Router, Request, Response } from "express";
import { signUp, login, me } from "../controllers/auth.controller";
import { errorHandler } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signUp));
authRoutes.post("/login", errorHandler(login));
authRoutes.get("/me", [authMiddleware], errorHandler(me));

export default authRoutes;
