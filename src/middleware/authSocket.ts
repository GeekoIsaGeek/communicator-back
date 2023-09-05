import jwt, { JwtPayload } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import User from '../models/user';
import { IUser } from '../types/user';

const authSocket = async (socket: Socket, next: Function) => {
	const token = socket.handshake.auth.token;
	if (!token) {
		return next(new Error('Authentication error'));
	}
	try {
		jwt.verify(token, process.env.TOKEN_SECRET as string);
		next();
	} catch (error) {
		next(new Error('Authentication error'));
	}
};

export default authSocket;
