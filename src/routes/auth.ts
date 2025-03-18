import { Router, Request, Response } from "express";
import { signUp } from "../controllers/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/signup", signUp);

export default authRoutes;
