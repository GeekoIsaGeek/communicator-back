import User from '../models/user';

const getUserWithConnections = async (email: string) => {
	try {
		const [user] = await User.aggregate([
			{
				$match: { email },
			},
			{
				$lookup: {
					from: 'users',
					localField: 'connections',
					foreignField: '_id',
					as: 'userConnections',
				},
			},
		]).exec();

		return {
			email: user.email,
			name: user.name,
			_id: user._id,
			avatar: user.avatar,
			connections: user.userConnections,
		};
	} catch (error) {
		throw new Error('Fetching user with detailed connections failed... ' + (error as Error).message);
	}
};

export default getUserWithConnections;
