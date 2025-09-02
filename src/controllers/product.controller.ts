import { Request, Response } from "express";
import { prismaClient } from "../index";
import { ProductSchema } from "../schema/product";
import { NotFoundException } from "../exceptions";
import { ErrorCodes, ErrorMessages } from "../types";

export const createProduct = async (req: Request, res: Response) => {
  ProductSchema.parse(req.body);
  const product = await prismaClient.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });

  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    throw new NotFoundException(ErrorMessages.NOT_FOUND, ErrorCodes.NOT_FOUND);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {};

export const getProducts = async (req: Request, res: Response) => {};

export const getProductById = async (req: Request, res: Response) => {};
