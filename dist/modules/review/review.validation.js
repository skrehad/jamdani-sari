"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = void 0;
const zod_1 = require("zod");
const createReviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string().min(5),
        rating: zod_1.z
            .string()
            .transform((val) => Number(val))
            .refine((val) => val >= 1 && val <= 5, {
            message: "Rating must be between 1 and 5",
        }),
        comment: zod_1.z.string().min(1),
    }),
});
exports.reviewValidation = {
    createReviewSchema,
};
