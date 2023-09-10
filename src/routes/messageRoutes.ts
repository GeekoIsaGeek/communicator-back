import express from 'express';
import protectRoute from '../middleware/protectRoute';
import { getMessages, removeMessages } from '../controllers/messageController';

const router = express.Router();

router.get('/', protectRoute, getMessages);
router.delete('/remove', protectRoute, removeMessages);

export default router;
