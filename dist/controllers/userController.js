"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserWithConnections = exports.getUsers = exports.getAuthenticatedUserData = void 0;
const user_1 = __importDefault(require("../models/user"));
const getAuthenticatedUserData = async (req, res) => {
    const { email } = req.user;
    try {
        const user = await (0, exports.getUserWithConnections)(email);
        if (!user) {
            throw new Error('User with this email does not exist');
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getAuthenticatedUserData = getAuthenticatedUserData;
const getUsers = async (req, res) => {
    try {
        const projection = {
            _id: 1,
            name: 1,
            avatar: 1,
        };
        const users = await user_1.default.find({ _id: { $ne: req.user._id } }, projection);
        res.json(users);
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.getUsers = getUsers;
const getUserWithConnections = async (email) => {
    try {
        const [user] = await user_1.default.aggregate([
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
    }
    catch (error) {
        throw new Error('Fetching user with detailed connections failed... ' + error.message);
    }
};
exports.getUserWithConnections = getUserWithConnections;
