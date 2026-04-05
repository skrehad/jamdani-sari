import z from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    category: z.enum(["PURE_COTTON", "HALF_SILK"]),

    // Transform strings from FormData to numbers
    price: z.preprocess((val) => Number(val), z.number()),
    discount: z.preprocess(
      (val) => (val === undefined || val === "" ? undefined : Number(val)),
      z.number().optional(),
    ),
    stock: z.preprocess((val) => Number(val), z.number()),

    colour: z.string(),
    blouse: z.string(),
    ghuri: z.string(),
    length: z.string(),
    care: z.string(),
    status: z.enum(["IN_STOCK", "PRE_ORDER"]),
  }),
});

const updateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    category: z.enum(["PURE_COTTON", "HALF_SILK"]).optional(),
    price: z.number().optional(),
    discount: z.number().optional(),
    blouse: z.string().optional(),
    colour: z.string().optional(),
    length: z.string().optional(),
    care: z.string().optional(),
    stock: z.number().optional(),
    status: z.enum(["IN_STOCK", "PRE_ORDER"]).optional(),
    ghuri: z.string().optional(),
  }),
});

export const productValidation = {
  createProductSchema,
  updateProductSchema,
};
