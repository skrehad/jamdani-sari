import { z } from "zod";

const createReviewSchema = z.object({
  body: z.object({
    username: z.string().min(5),
    rating: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => val >= 1 && val <= 5, {
        message: "Rating must be between 1 and 5",
      }),
    comment: z.string().min(1),
  }),
});

export const reviewValidation = {
  createReviewSchema,
};
