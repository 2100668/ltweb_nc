import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  // State để lưu giá trị lựa chọn
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
    if (selectedOption === 'option3') {
      handleLogout();
    }

    if (selectedOption === "option1"){
      navigate("/adminProfile")
    }

    if (selectedOption === "option2"){
      navigate("/updatePass")
    }
  
  }, [selectedOption, navigate, handleLogout]); // Thêm handleLogout vào danh sách phụ thuộc

  // Hàm xử lý khi người dùng thay đổi lựa chọn
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="">Nguyễn</option>
        <option value="option1">Thông tin người dùng</option>
        <option value="option2">Đổi mật khẩu</option>
        <option value="option3">Đăng xuất</option>
      </select>
    </div>
  );
};

export default Admin;
