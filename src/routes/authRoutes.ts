import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';
import { upload } from '../config/multer';
import protectRoute from '../middleware/protectRoute';
import { getAuthenticatedUserData } from '../controllers/userController';

const router = express.Router();

router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser);
router.get('/user', protectRoute, getAuthenticatedUserData);

export default router;
