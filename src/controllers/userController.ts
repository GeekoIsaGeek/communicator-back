import User from '../models/user';
import { IExtendedRequest } from '../types/general';
import { Response } from 'express';

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
			id: user._id,
			avatar: user.avatar,
		});
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};

export const getUsers = async (req: IExtendedRequest, res: Response) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.json({ error: (error as Error).message });
	}
};
