// routes/NewsRoutes.js
import express from 'express';
import connection from '../configs/DB.js';

const router = express.Router();

// Lấy danh sách tin tức
router.get('/', (req, res) => {
  connection.query('SELECT * FROM news', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Lấy chi tiết tin tức
router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM news WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// Thêm tin tức mới
router.post('/', (req, res) => {
  const { title, content } = req.body;
  connection.query('INSERT INTO news (title, content) VALUES (?, ?)', [title, content], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId, title, content });
  });
});

// Cập nhật tin tức
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  connection.query('UPDATE news SET title = ?, content = ? WHERE id = ?', [title, content, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Tin tức đã được cập nhật' });
  });
});

// Xóa tin tức
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM news WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Tin tức đã được xóa' });
  });
});

export default router;
