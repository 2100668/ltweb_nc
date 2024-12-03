import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  // State để lưu giá trị lựa chọn
  const username = localStorage.getItem("username")
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất (dùng useCallback để tránh tạo lại hàm mỗi lần render)
  const handleLogout = useCallback(() => {
    localStorage.removeItem('username');  // Xóa username khỏi localStorage
    localStorage.removeItem('token');  // Xóa token khỏi localStorage
    localStorage.removeItem('role');  // Xóa role khỏi localStorage
    navigate('/login');  // Chuyển hướng về trang login
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem("role");

    // Kiểm tra token và điều hướng
    if (token) {
      role === "admin" ? navigate("/admin") : navigate("/user");
    }

    // Kiểm tra xem người dùng có chọn "Đăng xuất" không
    if (selectedOption === 'option4') {
      handleLogout();
    }

    if (selectedOption === "option1"){
      navigate("/profile")
    }

    if (selectedOption === 'option2') {
      navigate('/addUser'); // Điều hướng đến trang AddUser
  }

    if (selectedOption === "option3"){
      navigate("/updatePass")
    }

    if (selectedOption === "option5"){
      navigate("/users")
    }

  
  }, [selectedOption, navigate, handleLogout]); // Thêm handleLogout vào danh sách phụ thuộc

  // Hàm xử lý khi người dùng thay đổi lựa chọn
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="">{username}</option>
        <option value="option1">Thông tin người dùng</option>
        <option value="option5">Danh sách tài khoản</option>
        <option value="option2">Cấp tài khoản</option>
        <option value="option3">Đổi mật khẩu</option>
        <option value="option4">Đăng xuất</option>
      </select>
    </div>
  );
};

export default Admin;
