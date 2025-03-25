import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../index";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException, NotFoundException } from "../exceptions/index";
import { ErrorCodes } from "../exceptions/root";
import { SignUpSchema, LoginSchema } from "../schema/auth";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignUpSchema.parse(req.body);
  const { email, name, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    throw new BadRequestsException(
      "User already exists",
      ErrorCodes.USER_ALREADY_EXISTS
    );
  }

  user = await prismaClient.user.create({
    data: {
      email,
      name,
      password: hashSync(password, 10),
    },
  });
  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  LoginSchema.parse(req.body);
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCodes.NOT_FOUND);
  }

  if (!compareSync(password, user.password)) {
    throw new BadRequestsException(
      "Incorrect password",
      ErrorCodes.INCORRECT_PASSWORD
    );
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  res.json({ user, token });
};

export const me = async (req: Request, res: Response) => {
  res.json((req as any).user);
};
