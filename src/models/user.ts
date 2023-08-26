import mongoose, { ValidatorProps } from 'mongoose';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: (email: string) => {
				const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				return regex.test(email);
			},
			message: (props: ValidatorProps) => `${props.value} is not a valid email!`,
		},
	},
	password: {
		type: String,
		required: true,
		min: [8, 'Password must contain at least 8 symbols'],
	},
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	connections: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

export default mongoose.model('User', userSchema);
