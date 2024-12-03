import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
} from '../Models/productModel.js';
import multer from 'multer';
import path from 'path';

// Thiết lập multer để xử lý hình ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads'); // Đường dẫn lưu hình ảnh
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Đặt tên file hình ảnh
  }
});

const upload = multer({ storage });

// Lấy danh sách sản phẩm
export const getProducts = async (req, res) => {
  try {
      const products = await getAllProducts();
      res.render('products/list', { products });
  } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      res.status(500).send('Lỗi khi lấy danh sách sản phẩm!');
  }
};

// Trang thêm sản phẩm
export const addProductPage = (req, res) => {
  res.render('products/add');
};

// Thêm sản phẩm
export const addProduct = (req, res) => {
  upload.single('hinhanh')(req, res, async (err) => {
      if (err) {
          console.error('Lỗi khi tải lên hình ảnh:', err);
          return res.status(500).send('Lỗi khi tải lên hình ảnh!');
      }
      const { ten, gia, mota, idloai } = req.body;
      const hinhanh = req.file ? req.file.filename : null; // Lấy tên file hình ảnh
      try {
          await createProduct({ ten, gia, hinhanh, mota, idloai });
          res.redirect('/products');
      } catch (error) {
          console.error('Lỗi khi thêm sản phẩm:', error);
          res.status(500).send('Lỗi khi thêm sản phẩm!');
      }
  });
};

// Trang sửa sản phẩm
export const editProductPage = async (req, res) => {
  const { id } = req.params;
  try {
      const product = await getProductById(id);
      if (!product) {
          return res.status(404).send('Sản phẩm không tồn tại!');
      }
      res.render('products/edit', { product });
  } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
      res.status(500).send('Lỗi khi lấy sản phẩm!');
  }
};

// Sửa sản phẩm
export const editProduct = (req, res) => {
  upload.single('hinhanh')(req, res, async (err) => {
      if (err) {
          console.error('Lỗi khi tải lên hình ảnh:', err);
          return res.status(500).send('Lỗi khi tải lên hình ảnh!');
      }
      const { id } = req.params;
      const { ten, gia, mota, idloai } = req.body;
      const hinhanh = req.file ? req.file.filename : null; // Kiểm tra nếu có hình ảnh mới
      try {
          await updateProduct(id, { ten, gia, hinhanh, mota, idloai });
          res.redirect('/products');
      } catch (error) {
          console.error('Lỗi khi sửa sản phẩm:', error);
          res.status(500).send('Lỗi khi sửa sản phẩm!');
      }
  });
};

// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
      await deleteProductById(id);
      res.redirect('/products');
  } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      res.status(500).send('Lỗi khi xóa sản phẩm!');
  }
};
