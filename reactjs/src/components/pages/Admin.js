import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../services/AuthService';
import NavbarAdmin from '../Navbars/NavbarAdmin';
import '../css/Admin.css'; // Import file CSS

const Admin = () => {
  const username = localStorage.getItem("username");
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  }, [navigate]);


  const handleDelete = async () => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xoá tài khoản này?");

    if (isConfirmed) {
      try {
        // Gọi API để xóa tài khoản (giả sử có một API deleteAccount)
        const response = await deleteUser(username);
        alert('Tài khoản đã được xoá thành công');
        handleLogout();  // Đăng xuất và chuyển hướng về trang login sau khi xoá tài khoản
      } catch (error) {
        alert(error.message || 'Lỗi khi xoá tài khoản');
      }
    } else {
      // Nếu bấm Cancel, giữ lại giá trị của dropdown là username
      setSelectedOption(username);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem("role");

    // Kiểm tra token và điều hướng
    if (!token && role !== "admin") {
      navigate("/login");
    }

  }, [navigate]);

  const handleChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);

    if (option === "option4") {
      handleLogout();  // Đăng xuất
    } else if (option === "option1") {
      navigate("/profile");  // Chuyển đến trang thông tin người dùng
    }
    else if (option === "option3") {
      navigate("/updatePass");  // Chuyển đến trang đổi mật khẩu
    }
    else if (option === "option6") {
      handleDelete();  // Xóa tài khoản
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="admin-container">
        <select id="dropdown" value={selectedOption} onChange={handleChange}>
          <option value="option0">{username}</option>
          <option value="option1">Thông tin người dùng</option>
          <option value="option3">Đổi mật khẩu</option>
          <option value="option6">Xoá tài khoản</option>
          <option value="option4">Đăng xuất</option>
        </select>
      </div>
    </div>
  );
};

export default Admin;
