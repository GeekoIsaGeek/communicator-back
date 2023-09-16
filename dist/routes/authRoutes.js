"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const multer_1 = require("../config/multer");
const protectRoute_1 = __importDefault(require("../middleware/protectRoute"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/register', multer_1.upload.single('avatar'), authController_1.registerUser);
router.post('/login', authController_1.loginUser);
router.get('/user', protectRoute_1.default, userController_1.getAuthenticatedUserData);
exports.default = router;
