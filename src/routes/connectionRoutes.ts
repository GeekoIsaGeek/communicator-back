import express from 'express';
import protectRoute from '../middleware/protectRoute';
import { removeConnection } from '../controllers/connectionController';

const router = express.Router();

router.post('/remove', protectRoute, removeConnection);

export default router;
