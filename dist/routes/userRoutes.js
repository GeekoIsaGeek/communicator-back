"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectRoute_1 = __importDefault(require("../middleware/protectRoute"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get('/', protectRoute_1.default, userController_1.getUsers);
exports.default = router;
