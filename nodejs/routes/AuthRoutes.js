import express from 'express';
import { registerUser, loginUser, getUserByUserName, updateByUsername, updatePassByUsername, getAllUsers, deleteUser } from '../controllers/userController.js';
const router = express.Router();

// Đăng ký tài khoản
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:username', getUserByUserName);  // Lấy thông tin người dùng theo username
router.put('/user/:username', updateByUsername);
router.put('/updatePass/:username', updatePassByUsername);
router.get('/users', getAllUsers);
router.delete('/user/:username', deleteUser);  // Route xóa người dùng

export default router;