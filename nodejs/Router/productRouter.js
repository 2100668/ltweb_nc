import express from 'express';
import {
    getProducts,
    addProduct,
    editProduct,
    deleteProduct,
    addProductPage, // Thêm import cho trang thêm sản phẩm
    editProductPage,
} from '../controller/productController.js';

const router = express.Router();

// Lấy danh sách sản phẩm
router.get('/', getProducts);

// Trang thêm sản phẩm
router.get('/add', addProductPage); // Thêm route cho GET /products/add

// Thêm sản phẩm
router.post('/add', addProduct);

// Hiển thị trang chỉnh sửa sản phẩm
router.get('/edit/:id', editProductPage);

// Sửa sản phẩm
router.post('/edit/:id', editProduct);

// Xóa sản phẩm
router.post('/delete/:id', deleteProduct);


export default router;
