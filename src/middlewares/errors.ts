import { Request, Response, NextFunction } from "express";
import { HttpExceptions } from "../exceptions/root";

export const errorHandler = (
  error: HttpExceptions,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
    errors: error.errors,
  });
};
