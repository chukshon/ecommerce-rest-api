import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../types";
import { JWT_SECRET } from "../secrets";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "../index";
import { User } from "@prisma/client";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.replace("Bearer ", "")!;

  if (!token) {
    next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;

    const user = await prismaClient.user.findFirst({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
    }

    (req as any).user = user;
    next();
  } catch (error) {
    next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
  }
};
