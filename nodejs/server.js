import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import connection from './DB.js'; // Import kết nối từ DB.js

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API để thêm tin tức
app.post('/api/news', (req, res) => {
  const { tieude, noidung } = req.body; // Lấy tieude và noidung từ request

  // Kiểm tra nếu thiếu thông tin
  if (!tieude || !noidung) {
    return res.status(400).send('Tiêu đề và nội dung không được để trống');
  }

  // Câu truy vấn để thêm tin tức vào bảng tintuc
  const query = 'INSERT INTO tintuc (tieude, noidung) VALUES (?, ?)';
  
  connection.query(query, [tieude, noidung], (err, result) => {
    if (err) {
      console.error('Lỗi khi thêm tin tức: ', err);
      return res.status(500).send('Lỗi khi thêm tin tức');
    }
    res.status(200).send('Tin tức đã được thêm thành công');
  });
});

// API để lấy danh sách tin tức
app.get('/api/news', (req, res) => {
  const query = 'SELECT * FROM tintuc';
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Lỗi khi lấy danh sách tin tức: ', err);
      return res.status(500).send('Lỗi khi lấy danh sách tin tức');
    }
    res.status(200).json(result); // Trả về danh sách tin tức dưới dạng JSON
  });
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
