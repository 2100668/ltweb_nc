import pool from '../configs/connectDatabase.js';

// Lấy tất cả loại
export const getAllCategories = async () => {
  const [rows] = await pool.query('SELECT * FROM loai');
  return rows;
};

// Lấy loại theo ID
export const getCategoryById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM loai WHERE idloai = ?', [id]);
  return rows[0]; // Trả về loại đầu tiên
};

// Tạo loại mới
export const createCategory = async (name) => {
  const [result] = await pool.query('INSERT INTO loai (tenloai) VALUES (?)', [name]);
  return result; // Trả về kết quả của truy vấn
};

// Cập nhật loại
export const updateCategory = async (id, name) => {
  await pool.query('UPDATE loai SET tenloai = ? WHERE idloai = ?', [name, id]);
};

// Xóa loại theo ID
export const deleteCategoryById = async (id) => {
  await pool.query('DELETE FROM loai WHERE idloai = ?', [id]);
};