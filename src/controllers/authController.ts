import User from '../models/user';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
	const { email, firstname, lastname, password } = req.body;

	try {
		const exists = await User.findOne({ email });

		if (exists) {
			throw Error('Email already in use');
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({ email, firstname, lastname, password: hashedPassword });
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};
