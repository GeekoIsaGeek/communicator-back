"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authSocket = async (socket, next) => {
    const token = socket.handshake.auth.token;
    const userId = socket.handshake.query.userId;
    if (!token) {
        return next(new Error('Authentication error'));
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        Object.assign(socket, { userId: userId?.toString() });
        next();
    }
    catch (error) {
        next(new Error('Authentication error'));
    }
};
exports.default = authSocket;
