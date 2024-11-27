// controllers/AuthController.js
import bcrypt from 'bcrypt';
import { createUser, findUserByUsername } from '../models/UserModel.js';

export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra tên đăng nhập đã tồn tại chưa
        const existingUser = await findUserByUsername(username);

        if (existingUser.length > 0) {
            // Nếu tên đăng nhập đã tồn tại
            return res.status(400).json({ error: 'Tên đăng nhập đã tồn tại' });
        }

        // Mã hóa mật khẩu
        const passwordHash = await bcrypt.hash(password, 10);

        // Lưu người dùng vào cơ sở dữ liệu
        await createUser(username, passwordHash);

        res.status(201).json({ message: 'Đăng ký thành công' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
