"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaProvider_1.default.review.create({
        data: payload,
    });
});
const getAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaProvider_1.default.review.findMany({
        orderBy: { createdAt: "desc" },
    });
});
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaProvider_1.default.review.delete({
        where: { id },
    });
});
exports.reviewService = {
    createReview,
    getAllReviews,
    deleteReview,
};
