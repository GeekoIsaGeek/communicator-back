import { Socket } from 'socket.io';
import { IUser } from './user';
import { Request } from 'express';
import { Types } from 'mongoose';

export interface IExtendedSocket extends Socket {
	userId?: string;
}
export interface IExtendedRequest extends Request {
	user?: IUser;
	imageName?: string;
}
export type ExtendedUser = IUser & { _id: string };
