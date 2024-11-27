// controllers/AuthController.js
import bcrypt from 'bcrypt';
import { createUser, findUserByUsername, updateUser } from '../models/UserModel.js';

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

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Tìm người dùng trong cơ sở dữ liệu
        const user = await findUserByUsername(username);

        if (user.length === 0) {
            // Nếu người dùng không tồn tại
            return res.status(400).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid) {
            // Nếu mật khẩu không đúng
            return res.status(400).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }


        // Trả về token
        res.status(200).json({ message: 'Đăng nhập thành công' });
                
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserByUserName = async (req, res) => {
    try {
        // Lấy username từ headers hoặc params (vì không phải từ body)
        const username = req.params.username || null;  // Lấy từ params nếu có (trong trường hợp GET request)

        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        // Tìm người dùng trong database
        const user = await findUserByUsername(username);

        if (user && user.length > 0) {
            return res.status(200).json({ user: user[0] });  // Trả về thông tin người dùng, chỉ lấy đối tượng đầu tiên
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateByUsername = async (req, res) => {
    try {
        const { fullname, email, sex, address } = req.body;  // Lấy thông tin từ body
        const username = req.params.username;  // Lấy username từ params

        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        // Cập nhật thông tin người dùng trong cơ sở dữ liệu
        const updatedUser = await updateUser(fullname, email, sex, address, username);

        if (updatedUser) {
            return res.status(200).json({ message: 'Cập nhật thành công', user: updatedUser });
        } else {
            return res.status(404).json({ error: 'Cập nhật thất bại' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};