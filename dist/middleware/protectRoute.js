"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const protectRoute = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ error: 'Authorization token not found!' });
    }
    if (authorization) {
        const token = authorization.split(' ')[1];
        try {
            const { id } = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            req.user = await user_1.default.findOne({ _id: id }).select('-password');
            next();
        }
        catch (e) {
            const errorMessage = e.message;
            res.status(401).json({ error: errorMessage });
        }
    }
};
exports.default = protectRoute;
