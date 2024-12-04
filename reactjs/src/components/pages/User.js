import React, { useEffect, useState, useCallback  } from 'react';
import { getUser } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import NavbarUser from '../Navbars/NavbarUser';
import { deleteUser } from '../../services/AuthService';
import '../css/User.css';  // Import CSS

const User = () => {
  // State để lưu giá trị lựa chọn
  const username = localStorage.getItem("username");
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất (dùng useCallback để tránh tạo lại hàm mỗi lần render)
  const handleLogout = useCallback(() => {
    localStorage.removeItem('username');  // Xóa username khỏi localStorage
    localStorage.removeItem('token');  // Xóa token khỏi localStorage
    localStorage.removeItem('role');  // Xóa role khỏi localStorage
    navigate('/login');  // Chuyển hướng về trang login
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
    if (!token) {
      navigate("/login");
    } else if (token && role === "admin"){
      navigate("/admin")
    }

  }, [navigate]); // Kiểm tra token khi load trang, chỉ chạy một lần

  // Hàm xử lý khi người dùng thay đổi lựa chọn
  const handleChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);

    if (option === "option3") {
      handleLogout();  // Đăng xuất
    } else if (option === "option1") {
      navigate("/profile");  // Chuyển đến trang thông tin người dùng
    } else if (option === "option2") {
      navigate("/updatePass");  // Chuyển đến trang đổi mật khẩu
    } else if (option === "option4") {
      handleDelete();  // Xóa tài khoản
    }
  };

  return (
    <div>
      <NavbarUser />
      <div className="admin-container"> {/* Áp dụng lớp CSS vào container */}
        <select id="dropdown" value={selectedOption} onChange={handleChange}>
          <option value="">{username}</option>
          <option value="option1">Thông tin người dùng</option>
          <option value="option2">Đổi mật khẩu</option>
          <option value="option4">Xoá tài khoản</option>
          <option value="option3">Đăng xuất</option>
        </select>
      </div>
    </div>
  );
};

export default User;
