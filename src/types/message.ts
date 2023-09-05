import { Types } from 'mongoose';

export interface IMessage {
	id: string;
	receiver: Types.ObjectId;
	sender: Types.ObjectId;
	content: string;
	seen: boolean;
}
