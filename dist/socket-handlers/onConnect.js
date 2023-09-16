"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onConnect = (io, socket, onlineUsers) => {
    if (socket.userId) {
        onlineUsers[socket?.userId] = socket.id;
        io.emit('onlineUsers', onlineUsers);
    }
};
exports.default = onConnect;
