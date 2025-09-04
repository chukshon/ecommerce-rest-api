import { z } from "zod";

export const AddressSchema = z.object({
  lineOne: z.string(),
  lineTwo: z.string().nullable(),
  pinCode: z.string().length(6),
  city: z.string(),
  country: z.string(),
});
