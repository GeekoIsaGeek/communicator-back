import mongoose from 'mongoose';

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
});

export default mongoose.model('Message', messageSchema);
