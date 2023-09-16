"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const userController_1 = require("./userController");
dotenv_1.default.config();
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
};
const validateFields = (email, password, name) => {
    if (!email || !password || !name) {
        throw Error('All fields are required');
    }
    if (!validator_1.default.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator_1.default.isStrongPassword(password)) {
        throw Error('Password is not strong enough (You must use at least one symbol,number and an uppercase character)');
    }
};
const registerUser = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        validateFields(email, password, name);
        const exists = await user_1.default.findOne({ email });
        if (exists) {
            throw new Error('Email already in use');
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const user = new user_1.default({ email, name, password: hashedPassword });
        if (req.imageName) {
            user.avatar = `/avatars/${req.imageName}`;
        }
        user.save();
        const token = createToken(user._id);
        res.status(200).json({ email, name, token, _id: user._id, avatar: user.avatar });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error('Both fields must be filled');
        }
        const user = await user_1.default.findOne({ email });
        if (!user) {
            throw new Error('Email is not correct');
        }
        const matched = await bcrypt_1.default.compare(password, user.password);
        if (!matched) {
            throw new Error('Password is not correct');
        }
        const userWithConnections = (0, userController_1.getUserWithConnections)(user.email);
        const token = createToken(user._id);
        res.status(200).json({ ...userWithConnections, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.loginUser = loginUser;
