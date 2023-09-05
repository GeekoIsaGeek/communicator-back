import Message from '../models/message';
import { Request, Response } from 'express';

export const getMessages = async (req: Request, res: Response) => {
	const { receiver, sender } = req.query;

	const messages = await Message.find({
		$or: [
			{ sender, receiver },
			{ sender: receiver, receiver: sender },
		],
	}).sort({ createdAt: 1 });

	res.status(200).json(messages);
};
