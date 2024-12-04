import express from 'express';
import connection from '../configs/DB.js'; // Kết nối MySQL
const router = express.Router();

// Thêm tin tức mới
router.post('/news', (req, res) => {
    const { title, content } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!title || !content) {
        return res.status(400).json({ error: 'Tiêu đề và nội dung không được bỏ trống.' });
    }

    const query = 'INSERT INTO tintuc (tieude, noidung) VALUES (?, ?)';
    connection.query(query, [title, content], (err, result) => {
        if (err) {
            console.error('Lỗi khi thêm tin tức:', err);
            return res.status(500).json({ error: 'Lỗi khi thêm tin tức vào cơ sở dữ liệu.' });
        }
        return res.status(201).json({ message: 'Thêm tin tức thành công!' });
    });
});

export default router;
