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
    const product = req.body;
    if (product.tags) {
      product.tags = product.tags.join(",");
    }
    const updatedProduct = await prismaClient.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: product,
    });

    res.json(updatedProduct);
  } catch (error) {
    throw new NotFoundException("Product Not Found", ErrorCodes.NOT_FOUND);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {};

export const getProducts = async (req: Request, res: Response) => {};

export const getProductById = async (req: Request, res: Response) => {};
