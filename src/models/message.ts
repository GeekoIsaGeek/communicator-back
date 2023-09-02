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

messageSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default mongoose.model('Message', messageSchema);
