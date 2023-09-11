import { IExtendedRequest, ExtendedUser } from '../types/general';
import { Response } from 'express';
import User from '../models/user';
import { Types } from 'mongoose';

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
	} catch (error) {
		throw new Error('User with the provided id could not be found');
	}
};
