import { Request, Response } from "express";
import { prismaClient } from "../index";
import { ProductSchema } from "../schema/product";

export const createProduct = async (req: Request, res: Response) => {
  ProductSchema.parse(req.body);
};
