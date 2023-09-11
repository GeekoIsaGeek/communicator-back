import { IExtendedRequest, ExtendedUser } from '../types/general';
import { Response } from 'express';
import User from '../models/user';
import { Types } from 'mongoose';
import { getUserWithConnections } from './userController';
import { IUser } from '../types/user';

export const removeConnection = async (req: IExtendedRequest, res: Response) => {
	const { connectionId } = req.body;

	try {
		const user = await User.findOne({ _id: (req.user as ExtendedUser)!._id });

		if (user && user.connections.includes(connectionId)) {
			user.connections = user.connections.filter((id) => id.toString() !== connectionId.toString());
			await user.save();
			res.status(200).json({ removedConnectionId: connectionId });
		}
	} catch (error) {
		res.status(400).json({ message: 'Connection could not be removed' });
	}
};

export const createConnection = async (userId: Types.ObjectId, connectionId: Types.ObjectId) => {
	try {
		const user = await User.findOne({ _id: userId });
		if (user && !user.connections.includes(connectionId)) {
			user.connections.push(connectionId);
			user.save();
		}
		return user;
	} catch (error) {
		throw new Error('User with the provided id could not be found');
	}
};

export const getConnections = async (req: IExtendedRequest, res: Response) => {
	const { email } = req.user as IUser;

	try {
		const { connections } = await getUserWithConnections(email);
		if (connections) {
			res.status(200).json(connections);
		}
	} catch (error) {
		res.status(400).json({ message: 'Connections could not be found' });
	}
};
