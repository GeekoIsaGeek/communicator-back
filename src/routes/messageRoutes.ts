import express from 'express';
import protectRoute from '../middleware/protectRoute';
import { getMessages } from '../controllers/messageController';

const router = express.Router();

router.get('/', protectRoute, getMessages);

export default router;
