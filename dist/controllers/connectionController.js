"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnections = exports.createConnection = exports.removeConnection = void 0;
const user_1 = __importDefault(require("../models/user"));
const userController_1 = require("./userController");
const removeConnection = async (req, res) => {
    const { connectionId } = req.body;
    try {
        const user = await user_1.default.findOne({ _id: req.user._id });
        if (user && user.connections.includes(connectionId)) {
            user.connections = user.connections.filter((id) => id.toString() !== connectionId.toString());
            await user.save();
            res.status(200).json({ removedConnectionId: connectionId });
        }
    }
    catch (error) {
        res.status(400).json({ message: 'Connection could not be removed' });
    }
};
exports.removeConnection = removeConnection;
const createConnection = async (userId, connectionId) => {
    try {
        const user = await user_1.default.findOne({ _id: userId });
        if (user && !user.connections.includes(connectionId)) {
            user.connections.push(connectionId);
            user.save();
        }
        return user;
    }
    catch (error) {
        throw new Error('User with the provided id could not be found');
    }
};
exports.createConnection = createConnection;
const getConnections = async (req, res) => {
    const { email } = req.user;
    try {
        const { connections } = await (0, userController_1.getUserWithConnections)(email);
        if (connections) {
            res.status(200).json(connections);
        }
    }
    catch (error) {
        res.status(400).json({ message: 'Connections could not be found' });
    }
};
exports.getConnections = getConnections;
