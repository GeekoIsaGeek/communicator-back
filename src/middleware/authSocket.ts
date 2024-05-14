import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';

const authSocket = async (socket: Socket, next: Function) => {
	const { token, userId } = socket.handshake.query;

	try {
		if (!token || !userId) {
			throw new Error('Authentication error');
		}
		jwt.verify(token.toString(), process.env.TOKEN_SECRET as string);
		Object.assign(socket, { userId: userId?.toString() });
		next();
	} catch (error) {
		next(new Error('Authentication error'));
	}
};

export default authSocket;
