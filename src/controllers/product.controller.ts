import { Request, Response } from "express";
import { prismaClient } from "../index";
import { ProductSchema } from "../schema/product";

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
  console.log("hello");
};

export const deleteProduct = async (req: Request, res: Response) => {};

export const getProducts = async (req: Request, res: Response) => {};

export const getProductById = async (req: Request, res: Response) => {};
