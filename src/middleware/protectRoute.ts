import jwt from 'jsonwebtoken';
import User from '../models/user';
import dotenv from 'dotenv';
import { Types } from 'mongoose';
import { NextFunction, Response, Request } from 'express';
import { IExtendedRequest } from '../types/general';

dotenv.config();

interface JwtPayload {
	id: Types.ObjectId;
}

const protectRoute = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;
	if (!authorization) {
		res.status(401).json({ error: 'Authorization token not found!' });
	}
	if (authorization) {
		const token = authorization.split(' ')[1];
		try {
			const { id } = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
			req.user! = await User.findOne({ _id: id }).select('-password');
			next();
		} catch (e) {
			const errorMessage = (e as Error).message;
			res.status(401).json({ error: errorMessage });
		}
	}
};

export default protectRoute;
