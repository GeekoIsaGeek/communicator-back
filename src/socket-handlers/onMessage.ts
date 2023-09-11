import { createConnection } from '../controllers/connectionController';
import Message from '../models/message';
import { IMessage } from '../types/message';
import { Server } from 'socket.io';
import { IExtendedSocket } from '../types/general';
import { IOnlineUsers } from '../types/user';

const onMessage = (io: Server, socket: IExtendedSocket, onlineUsers: IOnlineUsers) => {
	return async ({ receiver, sender, content }: IMessage) => {
		const message = await Message.create({
			receiver,
			sender,
			content,
			seen: false,
		});

		await createConnection(sender, receiver);
		await createConnection(receiver, sender);

		const receiverSocket = onlineUsers[receiver.toString()];
		io.to([receiverSocket, socket.id]).emit('message', message);
	};
};

export default onMessage;
