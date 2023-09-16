"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const authSocket_1 = __importDefault(require("./middleware/authSocket"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const connectionRoutes_1 = __importDefault(require("./routes/connectionRoutes"));
const onMessage_1 = __importDefault(require("./socket-handlers/onMessage"));
const onConnect_1 = __importDefault(require("./socket-handlers/onConnect"));
const onDisconnect_1 = __importDefault(require("./socket-handlers/onDisconnect"));
(0, dbConnection_1.default)();
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_APP_URL,
        methods: ['GET', 'POST'],
    },
});
const onlineUsers = {};
app.use((0, cors_1.default)({ origin: process.env.CLIENT_APP_URL }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/messages', messageRoutes_1.default);
app.use('/api/connections', connectionRoutes_1.default);
app.use('/api/avatars', express_1.default.static('storage/images/avatars'));
io.use((socket, next) => {
    (0, authSocket_1.default)(socket, next);
}).on('connection', (socket) => {
    (0, onConnect_1.default)(io, socket, onlineUsers);
    socket.on('message', (0, onMessage_1.default)(io, socket, onlineUsers));
    socket.on('disconnect', () => (0, onDisconnect_1.default)(io, socket, onlineUsers));
});
app.get('/', (req, res) => {
    res.send(`
		<h1 style="text-align:center; font-family:system-ui">
			REST API for a messaging app
		</h1>
	`);
});
mongoose_1.default.connection.once('open', () => {
    server.listen(process.env.PORT, () => {
        console.log('Server has started');
    });
});
