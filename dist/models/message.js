"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    content: {
        required: true,
        type: String,
    },
    sender: {
        required: true,
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    receiver: {
        required: true,
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    seen: {
        required: true,
        type: Boolean,
    },
});
exports.default = mongoose_1.default.model('Message', messageSchema);
