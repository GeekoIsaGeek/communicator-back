import { IUser } from './user';
import { Request } from 'express';

export interface IExtendedRequest extends Request {
	user?: IUser;
	imageName?: string;
}
export type ExtendedUser = IUser & { _id: string };
