import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavbarAdmin.css'; // Tùy chọn: Thêm CSS để style Navbar

const NavbarUser = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="">Trang chủ</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/sanpham">Sản Phẩm</Link>
        </li>
        <li>
          <Link to="/loai">Loại</Link>
        </li>
        <li>
          <Link to="/NewsList">Tin Tức</Link>
        </li>
        <li>
          <Link to="/login">Đăng nhập</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarUser;
