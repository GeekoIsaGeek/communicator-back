import User from '../models/user';
import { IExtendedRequest } from '../types/general';
import { Response } from 'express';
import { IUser } from '../types/user';

type ExtendedUser = IUser & { id: string };

export const getAuthenticatedUserData = async (req: IExtendedRequest, res: Response) => {
	const { email } = req.user!;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			throw new Error('User with this email does not exist');
		}

		res.status(200).json({
			email: user.email,
			firstname: user.firstname,
			lastname: user.lastname,
			id: user.id,
			avatar: user.avatar,
		});
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};

export const getUsers = async (req: IExtendedRequest, res: Response) => {
	try {
		const projection = {
			id: 1,
			firstname: 1,
			lastname: 1,
			avatar: 1,
		};
		const users = await User.find({ id: { $ne: (req.user as ExtendedUser)!.id } }, projection);

		res.json(users);
	} catch (error) {
		res.json({ error: (error as Error).message });
	}
};
