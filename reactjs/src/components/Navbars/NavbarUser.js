import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavbarAdmin.css'; // Tùy chọn: Thêm CSS để style Navbar

const NavbarUser = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/user">Trang chủ</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/sp">Sản Phẩm</Link>
        </li>
        <li>
          <Link to="/l">Loại</Link>
        </li>
        <li>
          <Link to="/NewsList">Tin Tức</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarUser;
