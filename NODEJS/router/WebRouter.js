import express from 'express';
import CategoryController from '../controller/CategoryController'; // Nhập CategoryController
import { adminMiddleware } from '../controller/authMiddlewareController'; // Nhập middleware cho quyền admin

const router = express.Router();

// API hiển thị trang tạo loại
router.get('/insertcategory', adminMiddleware, CategoryController.createloai);

// API thêm loại mới
router.post('/insertcategory', adminMiddleware, CategoryController.insertloai);

// API hiển thị danh sách loại
router.get('/listcategory', adminMiddleware, CategoryController.getAllnhom);

// API xóa loại
router.post('/deletecategory', adminMiddleware, CategoryController.deleteNhom);

// API hiển thị trang sửa loại
router.get('/editcategory/:idnhom', adminMiddleware, CategoryController.editCategory);

// API cập nhật loại
router.post('/editcategory/', adminMiddleware, CategoryController.updateCategory);

export default router;