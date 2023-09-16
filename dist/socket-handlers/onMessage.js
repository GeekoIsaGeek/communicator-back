"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectionController_1 = require("../controllers/connectionController");
const message_1 = __importDefault(require("../models/message"));
const onMessage = (io, socket, onlineUsers) => {
    return async ({ receiver, sender, content }) => {
        const message = await message_1.default.create({
            receiver,
            sender,
            content,
            seen: false,
        });
        await (0, connectionController_1.createConnection)(sender, receiver);
        await (0, connectionController_1.createConnection)(receiver, sender);
        const receiverSocket = onlineUsers[receiver.toString()];
        io.to([receiverSocket, socket.id]).emit('message', message);
    };
};
exports.default = onMessage;
