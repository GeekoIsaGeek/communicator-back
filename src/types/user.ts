import mongoose, { Types } from 'mongoose';

export interface IUser {
	email: string;
	password: string;
	name: string;
	connections?: Types.ObjectId[];
}

export interface IOnlineUsers {
	[key: string]: string;
}

export interface IUserDocument extends mongoose.Document, IUser {}
