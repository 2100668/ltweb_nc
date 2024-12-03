import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  // Lấy thông tin từ localStorage
  const username = localStorage.getItem('username');
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất
  const handleLogout = useCallback(() => {
    localStorage.removeItem('username'); // Xóa username khỏi localStorage
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    localStorage.removeItem('role'); // Xóa role khỏi localStorage
    navigate('/login'); // Chuyển hướng về trang login
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Kiểm tra token và role
    if (!token) {
      navigate('/login'); // Chuyển hướng nếu không có token
    } else if (role !== 'admin') {
      navigate('/user'); // Chuyển hướng nếu không phải admin
    }

    // Điều hướng dựa trên lựa chọn
    switch (selectedOption) {
      case 'profile':
        navigate('/profile'); // Thông tin người dùng
        break;
      case 'userList':
        navigate('/users'); // Danh sách tài khoản
        break;
      case 'createAccount':
        navigate('/create-account'); // Cấp tài khoản
        break;
      case 'updatePassword':
        navigate('/updatePass'); // Đổi mật khẩu
        break;
      case 'ManageNews':
        navigate('/ManageNews'); // Quản lý tin tức
        break;
      case 'logout':
        handleLogout(); // Đăng xuất
        break;
      default:
        break;
    }
  }, [selectedOption, navigate, handleLogout]);

  // Hàm xử lý khi người dùng thay đổi lựa chọn
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h1>Chào mừng, {username}</h1>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="profile">Thông tin người dùng</option>
        <option value="userList">Danh sách tài khoản</option>
        <option value="createAccount">Cấp tài khoản</option>
        <option value="updatePassword">Đổi mật khẩu</option>
        <option value="ManageNews">Quản lý tin tức</option>
        <option value="logout">Đăng xuất</option>
      </select>
    </div>
  );
};

export default Admin;
