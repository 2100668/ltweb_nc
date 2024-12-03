import express from "express";
import {
  getCategories,
  addCategoryPage,
  addCategory,
  editCategoryPage,
  editCategory,
  deleteCategory,
} from "../controller/categoryController.js";

const router = express.Router();

// Route lấy danh sách loại
router.get("/", getCategories);

// Route thêm loại
router.get("/add", addCategoryPage);
router.post("/add", addCategory);

// Route sửa loại
router.get("/edit/:id", editCategoryPage);
router.post("/edit/:id", editCategory);

// Route xóa loại
router.post("/delete/:id", deleteCategory);

export default router;
