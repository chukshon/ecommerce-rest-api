import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
