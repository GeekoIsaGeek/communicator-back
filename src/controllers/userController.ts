import User from '../models/user';
import { IExtendedRequest } from '../types/general';
import { Response } from 'express';
import getUserWithConnections from '../actions/getUserWithConnections';
import { ExtendedUser } from '../types/general';

export const getAuthenticatedUserData = async (req: IExtendedRequest, res: Response) => {
	const { email } = req.user!;
	try {
		const user = await getUserWithConnections(email);

		if (!user) {
			throw new Error('User with this email does not exist');
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};

export const getUsers = async (req: IExtendedRequest, res: Response) => {
	try {
		const projection = {
			_id: 1,
			name: 1,
			avatar: 1,
		};
		const users = await User.find({ _id: { $ne: (req.user as ExtendedUser)!._id } }, projection);

		res.json(users);
	} catch (error) {
		res.json({ error: (error as Error).message });
	}
};
