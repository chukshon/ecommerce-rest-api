import { Router, Request, Response } from "express";
import { signUp, login } from "../controllers/auth.controller";
import { errorHandler } from "../error-handler";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signUp));
authRoutes.post("/login", errorHandler(login));

export default authRoutes;
