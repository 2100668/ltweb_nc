import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavbarAdmin.css'; // Tùy chọn: Thêm CSS để style Navbar

const NavbarAdmin = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/admin">Admin</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/quanlysp">Quản lý sản phẩm</Link>
        </li>
        <li>
          <Link to="/quanlyloai">Quản Lý Loại</Link>
        </li>
        <li>
          <Link to="/qlnews">Quản Lý Tin Tức</Link>
        </li>
        <li>
          <Link to="/users">Danh Sách Tài Khoản</Link>
        </li>
        <li>
          <Link to="/addUser">Cấp Tài Khoản</Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default NavbarAdmin;
