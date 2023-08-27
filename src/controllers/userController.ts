import User from '../models/user';
import { IExtendedRequest } from '../types/general';
import { Response } from 'express';

export const getUserData = async (req: IExtendedRequest, res: Response) => {
	const { email } = req.user!;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			throw new Error('User with this email does not exist');
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};
