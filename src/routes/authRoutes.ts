import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';
import { upload } from '../config/multer';

const router = express.Router();

router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser);

export default router;
