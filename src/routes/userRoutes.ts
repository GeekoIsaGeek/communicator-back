import express from 'express';
import protectRoute from '../middleware/protectRoute';
import { getUserData } from '../controllers/userController';

const router = express.Router();

router.get('/', protectRoute, getUserData);

export default router;
