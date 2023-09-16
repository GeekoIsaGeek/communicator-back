"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join('storage', 'images', 'avatars'),
    filename: (req, file, callback) => {
        const imageName = (Date.now() + '-' + file.originalname).replaceAll('/', '-');
        req.imageName = imageName;
        callback(null, imageName);
    },
});
exports.upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
});
