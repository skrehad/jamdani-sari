import z from "zod";

const addToWishlistSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: "Product ID is required" }),
  }),
});

const removeFromWishlistSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: "Product ID is required" }),
  }),
});

export const wishlistValidation = {
  addToWishlistSchema,
  removeFromWishlistSchema,
};
