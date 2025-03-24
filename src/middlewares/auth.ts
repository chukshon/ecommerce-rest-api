import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract the token from the request headers
  // If no token is found, throw an UnauthorizedException
  // If the token is found, verify it and extract the payload
  // Get the user from the payload
  // Attach the user to the current request object;

  const token = req.headers.authorization;
};
