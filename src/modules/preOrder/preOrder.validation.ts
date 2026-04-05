import z from "zod";

const createPreOrderSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: "Product ID is required" }),
    quantity: z.number({ required_error: "Quantity required" }).min(1),
  }),
});

export const preOrderValidation = { createPreOrderSchema };
