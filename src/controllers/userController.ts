import User from '../models/user';
import { IExtendedRequest } from '../types/general';
import { Response } from 'express';
import { IUser } from '../types/user';

type ExtendedUser = IUser & { _id: string };

export const getAuthenticatedUserData = async (req: IExtendedRequest, res: Response) => {
	const { email } = req.user!;

	try {
		const [user] = await User.aggregate([
			{
				$match: { email },
			},
			{
				$lookup: {
					from: 'users',
					localField: 'connections',
					foreignField: '_id',
					as: 'userConnections',
				},
			},
		]).exec();

		if (!user) {
			throw new Error('User with this email does not exist');
		}
		res.status(200).json({
			email: user.email,
			name: user.name,
			_id: user._id,
			avatar: user.avatar,
			connections: user.userConnections,
		});
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
