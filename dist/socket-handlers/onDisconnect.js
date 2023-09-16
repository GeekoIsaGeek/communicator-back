"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onDisconnect = (io, socket, onlineUsers) => {
    delete onlineUsers[socket.userId];
    io.emit('onlineUsers', onlineUsers);
};
exports.default = onDisconnect;
