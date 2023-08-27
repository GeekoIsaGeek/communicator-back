import express, { Request, Response } from 'express';
import protectRoute from '../middleware/protectRoute';
import { getUserData } from '../controllers/userController';
import { IExtendedRequest } from '../types/general';

const router = express.Router();

router.get('/', protectRoute, getUserData);

export default router;
