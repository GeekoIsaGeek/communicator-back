"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectRoute_1 = __importDefault(require("../middleware/protectRoute"));
const connectionController_1 = require("../controllers/connectionController");
const router = express_1.default.Router();
router.post('/remove', protectRoute_1.default, connectionController_1.removeConnection);
router.get('/', protectRoute_1.default, connectionController_1.getConnections);
exports.default = router;
