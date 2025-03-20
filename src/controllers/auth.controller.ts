import { Request, Response } from "express";
import { prismaClient } from "../index";
import { hashSync } from "bcrypt";

export const signUp = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    throw Error("User already exists");
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
  const { email, name } = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw Error("User does not exist");
  }
};
