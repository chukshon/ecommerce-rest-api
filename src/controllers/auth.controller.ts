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

  res.send("Signup working");
};
