import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
} from "../Models/categoryModel.js";
import pool from '../configs/connectDatabase.js';

// Trong categoryController.js
export const getCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM loai');
    res.render('categories/list', { categories: rows }); // Đảm bảo bạn trả về một template EJS
  } catch (error) {
    console.error('Lỗi khi lấy danh sách loại:', error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách loại!' });
  }
};


// Trang thêm loại
export const addCategoryPage = (req, res) => {
  res.render("categories/add");
};

// Thêm loại
export const addCategory = async (req, res) => {
  const { name } = req.body;
  console.log("Dữ liệu nhận được:", req.body); // Xem dữ liệu nhận được
  try {
    await createCategory(name);
    res.redirect("/categories");
  } catch (error) {
    console.error("Lỗi khi thêm loại:", error); // In lỗi ra console
    res.status(500).send("Lỗi khi thêm loại!");
  }
};

// Trang sửa loại
export const editCategoryPage = async (req, res) => {
  const { id } = req.params; // Sử dụng req.params
  try {
    const category = await getCategoryById(id);
    if (!category) {
      return res.status(404).send("Loại không tồn tại!");
    }
    res.render("categories/edit", { category });
  } catch (error) {
    res.status(500).send("Lỗi khi lấy loại!");
  }
};

// Sửa loại
export const editCategory = async (req, res) => {
  const { id } = req.params; // Sử dụng req.params
  const { name } = req.body; // Sử dụng req.body
  try {
    await updateCategory(id, name);
    res.redirect("/categories");
  } catch (error) {
    res.status(500).send("Lỗi khi sửa loại!");
  }
};

// Xóa loại
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCategoryById(id);
    res.redirect('/categories'); // Chuyển hướng sau khi xóa thành công
  } catch (error) {
    console.error('Lỗi khi xóa loại:', error);
    res.status(500).send('Lỗi khi xóa loại!');
  }
};
