import mongoose from 'mongoose';
import { IMessage } from '../types/message';

const messageSchema = new mongoose.Schema({
	content: {
		required: true,
		type: String,
	},
	sender: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	receiver: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	seen: {
		required: true,
		type: Boolean,
	},
});

export default mongoose.model<IMessage>('Message', messageSchema);
