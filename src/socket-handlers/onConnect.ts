import { Server } from 'socket.io';
import { IExtendedSocket } from '../types/general';
import { IOnlineUsers } from '../types/user';

const onConnect = (io: Server, socket: IExtendedSocket, onlineUsers: IOnlineUsers) => {
	if (socket.userId) {
		onlineUsers[socket?.userId as string] = socket.id;
		io.emit('onlineUsers', onlineUsers);
	}
};

export default onConnect;
