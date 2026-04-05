import z from "zod";

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
  }),
});

const changeStatusSchema = z.object({
  body: z.object({
    status: z.enum(["ACTIVE", "BLOCKED", "DELETED"]),
  }),
});

export const userValidation = {
  updateUserSchema,
  changeStatusSchema,
};
