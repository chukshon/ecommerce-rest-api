import { Request, Response } from "express";
import { prismaClient } from "../index";

export const signUp = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  res.send("Signup working");
};
