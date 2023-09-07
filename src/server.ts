import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/dbConnection';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { IMessage } from './types/message';
import Message from './models/message';
import authSocket from './middleware/authSocket';
import messageRoutes from './routes/messageRoutes';
import User from './models/user';

connectDB();

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: process.env.CLIENT_APP_URL,
		methods: ['GET', 'POST'],
	},
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/avatars', express.static('storage/images/avatars'));
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

io.use((socket, next) => {
	authSocket(socket, next);
});

io.on('connection', (socket: Socket) => {
	socket.on('message', async ({ receiver, sender, content, room }: IMessage & { room: string }) => {
		socket.join(room);

		const message = await Message.create({
			receiver,
			sender,
			content,
			seen: false,
		});

		const user = await User.findById(sender).select('-password');
		if (user && !user.connections.includes(receiver)) {
			user.connections.push(receiver);
			user.save();
		}

		io.to(room).emit('message', message);
	});
});

app.get('/', (req, res) => {
	res.send(`
		<h1 style="text-align:center; font-family:system-ui">
			REST API for a messaging app
		</h1>
	`);
});

mongoose.connection.once('open', () => {
	server.listen(process.env.PORT, () => {
		console.log('Server has started');
	});
});
