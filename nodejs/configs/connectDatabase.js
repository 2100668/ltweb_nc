import mysql from 'mysql2/promise.js';

// Tạo pool kết nối
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'ltwebnc',
  password: '',
});

// Kiểm tra kết nối
(async () => {
  try {
    await pool.query('SELECT 1'); // Chỉ cần gọi query mà không có callback
    console.log('Đã kết nối cơ sở dữ liệu');
  } catch (err) {
    console.error('Lỗi kết nối cơ sở dữ liệu:', err);
    process.exit(1); // Dừng ứng dụng nếu kết nối không thành công
  }
})();

export default pool;