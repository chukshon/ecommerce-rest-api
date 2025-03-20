import { Router, Request, Response } from "express";
import { signUp, login } from "../controllers/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);

export default authRoutes;
