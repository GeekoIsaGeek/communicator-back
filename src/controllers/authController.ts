import User from '../models/user';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (id: Types.ObjectId) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET!, { expiresIn: '7d' });
};

const validateFields = (email: string, password: string, firstname: string, lastname: string) => {
	if (!email || !password || !firstname || !lastname) {
		throw Error('All fields are required');
	}

	if (!validator.isEmail(email)) {
		throw Error('Email is not valid');
	}

	if (!validator.isStrongPassword(password)) {
		throw Error('Password is not strong enough');
	}
};

export const registerUser = async (req: Request, res: Response) => {
	const { email, firstname, lastname, password } = req.body;

	try {
		validateFields(email, password, firstname, lastname);

		const exists = await User.findOne({ email });

		if (exists) {
			throw new Error('Email already in use');
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({ email, firstname, lastname, password: hashedPassword });

		const token = createToken(user._id);

		res.status(200).json({ email, firstname, lastname, token });
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			throw new Error('Both fields must be filled');
		}

		const user = await User.findOne({ email });

		if (!user) {
			throw new Error('Email is not correct');
		}

		const matched = await bcrypt.compare(password, user.password);

		if (!matched) {
			throw new Error('Password is not correct');
		}
		const token = createToken(user._id);

		res.status(200).json({ email, firstname: user.firstname, lastname: user.lastname, token });
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
};
