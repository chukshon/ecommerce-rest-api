import { z } from "zod";

export const AddressSchema = z.object({
  lineOne: z.string(),
  lineTwo: z.string().nullable(),
  pinCode: z.string().length(6),
  city: z.string(),
  country: z.string(),
});

export const UpdateUserSchema = z.object({
  name: z.string().nullable(),
  defaultShippingAddress: z.number().nullable(),
  defaultBillingAddress: z.number().nullable(),
});
