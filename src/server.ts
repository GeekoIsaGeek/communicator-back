import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/dbConnection';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import http from 'http';
import { Server, Socket } from 'socket.io';
import authSocket from './middleware/authSocket';
import messageRoutes from './routes/messageRoutes';
import connectionRoutes from './routes/connectionRoutes';
import { IOnlineUsers } from './types/user';
import { IExtendedSocket } from './types/general';
import onMessage from './socket-handlers/onMessage';
import onConnect from './socket-handlers/onConnect';
import onDisconnect from './socket-handlers/onDisconnect';
import { logger } from './config/logger';
import { info } from 'console';

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

const onlineUsers: IOnlineUsers = {};

app.use(cors({ origin: process.env.CLIENT_APP_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/avatars', express.static('storage/images/avatars'));

io.use((socket: Socket, next) => {
	authSocket(socket, next);
}).on('connection', (socket: IExtendedSocket) => {
	onConnect(io, socket, onlineUsers);
	socket.on('message', onMessage(io, socket, onlineUsers));
	socket.on('disconnect', () => onDisconnect(io, socket, onlineUsers));
});

app.get('/', (req, res) => {
	res.send(`
		<h1 style="text-align:center; font-family:system-ui">
			REST API for a one-to-one messaging app
		</h1>
	`);
});

mongoose.connection.once('open', () => {
	server.listen(process.env.PORT, () => {
		logger.info(`Server has started on port ${process.env.PORT}`);
	});
});
