import { Server } from 'socket.io';
import { IExtendedSocket } from '../types/general';
import { IOnlineUsers } from '../types/user';

const onDisconnect = (io: Server, socket: IExtendedSocket, onlineUsers: IOnlineUsers) => {
	delete onlineUsers[socket.userId!];
	io.emit('onlineUsers', onlineUsers);
};

export default onDisconnect;
