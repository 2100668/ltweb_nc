import pool from '../configs/connectDatabase.js';

export const getAllProducts = async () => {
    const [rows] = await pool.query('SELECT * FROM sanpham');
    return rows;
};

export const getProductById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM sanpham WHERE masp = ?', [id]);
    return rows[0];
};

export const createProduct = async (product) => {
    const { ten, gia, hinhanh, mota, idloai } = product;
    await pool.query('INSERT INTO sanpham (ten, gia, hinhanh, mota, idloai) VALUES (?, ?, ?, ?, ?)', [ten, gia, hinhanh, mota, idloai]);
};

export const updateProduct = async (id, product) => {
    const { ten, gia, hinhanh, mota, idloai } = product;
    await pool.query('UPDATE sanpham SET ten = ?, gia = ?, hinhanh = ?, mota = ?, idloai = ? WHERE masp = ?', [ten, gia, hinhanh, mota, idloai, id]);
};

export const deleteProductById = async (id) => {
    await pool.query('DELETE FROM sanpham WHERE masp = ?', [id]);
};
