import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../index";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    next(
      new BadRequestsException(
        "User already exists",
        ErrorCodes.USER_ALREADY_EXISTS
      )
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
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw Error("User does not exist");
  }

  if (!compareSync(password, user.password)) {
    throw Error("Incorrect password");
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET);

  res.json({ user, token });
};
