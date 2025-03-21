import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../index";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { UnprocessableEntity } from "../exceptions/validation";
import { ErrorCodes } from "../exceptions/root";
import { SignUpSchema } from "../schema/users";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    SignUpSchema.parse(req.body);
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
  } catch (err: any) {
    next(
      new UnprocessableEntity(
        err?.issues,
        "Unprocessable Entity",
        ErrorCodes.UNPROCESSABLE_ENTITY
      )
    );
  }
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
