import { Request, Response } from "express";
import { AddressSchema, UpdateUserSchema } from "../schema/users";
import { NotFoundException } from "../exceptions";
import { ErrorCodes, ErrorMessages } from "../types";
import { Address, User } from "@prisma/client";
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

export const updateUser = async (req: Request, res: Response) => {
  const validatedData = UpdateUserSchema.parse(req.body);
  let shippingAddress: Address;
  let billingAddress: Address;

  if (validatedData.defaultShippingAddress) {
    try {
      shippingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultShippingAddress,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        ErrorMessages.ADDRESS_NOT_FOUND,
        ErrorCodes.ADDRESS_NOT_FOUND
      );
    }
  }

  if (validatedData.defaultBillingAddress) {
    try {
      billingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultBillingAddress,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        ErrorMessages.ADDRESS_NOT_FOUND,
        ErrorCodes.ADDRESS_NOT_FOUND
      );
    }
  }

  const updatedUser = await prismaClient.user.update({
    where: {
      id: (req as any).user?.id,
    },
    data: {
      name: validatedData.name ?? undefined,
      defaultShippingAddress: validatedData.defaultShippingAddress ?? undefined,
      defaultBillingAddress: validatedData.defaultBillingAddress ?? undefined,
    },
  });

  res.json(updatedUser);
};
