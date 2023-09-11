import express from 'express';
import protectRoute from '../middleware/protectRoute';
import { getConnections, removeConnection } from '../controllers/connectionController';

const router = express.Router();

router.post('/remove', protectRoute, removeConnection);
router.get('/', protectRoute, getConnections);

export default router;
