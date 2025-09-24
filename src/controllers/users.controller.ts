import { Request, Response } from "express";
import { AddressSchema } from "../schema/users";
import { NotFoundException } from "../exceptions";
import { ErrorCodes, ErrorMessages } from "../types";
import { User } from "@prisma/client";
import { prismaClient } from "..";

export const addAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);
  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: (req as any).user?.id,
    },
  });
  res.json(address);
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    await prismaClient.address.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({ status: true });
  } catch (error) {
    throw new NotFoundException(
      ErrorMessages.ADDRESS_NOT_FOUND,
      ErrorCodes.ADDRESS_NOT_FOUND
    );
  }
};

export const listAddress = async (req: Request, res: Response) => {
  const addresses = await prismaClient.address.findMany({
    where: {
      userId: (req as any).user?.id,
    },
  });
  res.json(addresses);
};

export const updateUser = async (req: Request, res: Response) => {};
