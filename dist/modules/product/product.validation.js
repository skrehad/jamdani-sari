"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = exports.createProductSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createProductSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string(),
        description: zod_1.default.string(),
        category: zod_1.default.enum(["PURE_COTTON", "HALF_SILK"]),
        // Transform strings from FormData to numbers
        price: zod_1.default.preprocess((val) => Number(val), zod_1.default.number()),
        discount: zod_1.default.preprocess((val) => (val === undefined || val === "" ? undefined : Number(val)), zod_1.default.number().optional()),
        stock: zod_1.default.preprocess((val) => Number(val), zod_1.default.number()),
        colour: zod_1.default.string(),
        blouse: zod_1.default.string(),
        ghuri: zod_1.default.string(),
        length: zod_1.default.string(),
        care: zod_1.default.string(),
        status: zod_1.default.enum(["IN_STOCK", "PRE_ORDER"]),
    }),
});
const updateProductSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().optional(),
        category: zod_1.default.enum(["PURE_COTTON", "HALF_SILK"]).optional(),
        price: zod_1.default.number().optional(),
        discount: zod_1.default.number().optional(),
        blouse: zod_1.default.string().optional(),
        colour: zod_1.default.string().optional(),
        length: zod_1.default.string().optional(),
        care: zod_1.default.string().optional(),
        stock: zod_1.default.number().optional(),
        status: zod_1.default.enum(["IN_STOCK", "PRE_ORDER"]).optional(),
        ghuri: zod_1.default.string().optional(),
    }),
});
exports.productValidation = {
    createProductSchema: exports.createProductSchema,
    updateProductSchema,
};
