"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMessages = exports.getMessages = void 0;
const message_1 = __importDefault(require("../models/message"));
const getMessages = async (req, res) => {
    const { receiver, sender } = req.query;
    const messages = await message_1.default.find({
        $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender },
        ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
};
exports.getMessages = getMessages;
const removeMessages = async (req, res) => {
    const { receiver, sender } = req.query;
    const messages = await message_1.default.deleteMany({
        $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender },
        ],
    });
    res.status(200).json(messages);
};
exports.removeMessages = removeMessages;
