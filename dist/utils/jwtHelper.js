"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelper = exports.decodedToken = exports.generateToken = void 0;
// src/utils/jwtHelper.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiresIn });
};
exports.generateToken = generateToken;
const decodedToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.decodedToken = decodedToken;
exports.jwtHelper = {
    generateToken: exports.generateToken,
    decodedToken: exports.decodedToken,
};
