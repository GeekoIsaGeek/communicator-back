import mongoose from 'mongoose';

export interface IUser {
	email: string;
	password: string;
	firstname: string;
	lastname: string;
	connections?: [
		{
			type: typeof mongoose.Schema.Types.ObjectId;
			ref: string;
		}
	];
}

export interface IUserDocument extends mongoose.Document, IUser {}
