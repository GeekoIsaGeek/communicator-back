import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import User from '../models/user';

const authSocket = async (socket: Socket, next: Function) => {
	const token = socket.handshake.auth.token;
	const userId = socket.handshake.query.userId;

	if (!token) {
		return next(new Error('Authentication error'));
	}
	try {
		jwt.verify(token, process.env.TOKEN_SECRET as string);
		Object.assign(socket, { userId: userId?.toString() });
		next();
	} catch (error) {
		next(new Error('Authentication error'));
	}
};

export default authSocket;
