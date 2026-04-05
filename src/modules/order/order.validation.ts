import z from "zod";

const createOrderSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        productId: z.string({ required_error: "Product ID required" }),
        quantity: z.number({ required_error: "Quantity required" }),
      })
    ),
    addressId: z.string({ required_error: "Address ID required" }),
  }),
});

const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(["PENDING", "SHIPPED", "DELIVERED"]),
  }),
});

export const orderValidation = {
  createOrderSchema,
  updateOrderStatusSchema,
};
