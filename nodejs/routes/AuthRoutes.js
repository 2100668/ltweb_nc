import express from 'express';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

// Đăng ký tài khoản
router.post('/register', registerUser);

export default router;
