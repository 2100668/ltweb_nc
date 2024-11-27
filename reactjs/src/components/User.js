import React, { useEffect, useState } from 'react';
import { getUser } from '../services/AuthService';  // Đảm bảo đường dẫn chính xác
import { useNavigate } from 'react-router-dom';  // Import useNavigate từ react-router-dom

const User = () => {
    const navigate = useNavigate();  // Khởi tạo navigate
    const [userData, setUserData] = useState(null);  // Trạng thái lưu dữ liệu người dùng
    const [loading, setLoading] = useState(true);  // Trạng thái tải dữ liệu

    useEffect(() => {
        const token = localStorage.getItem('token');  // Lấy token từ localStorage

        if (!token) {
            navigate('/login');  // Chuyển hướng về trang login nếu không có token
        } else {
            // Gọi API để lấy thông tin người dùng
            getUser()
                .then((data) => {
                    setUserData(data.user);  // Lưu dữ liệu người dùng vào trạng thái
                })
                .catch((error) => {
                    console.error('Lỗi khi lấy dữ liệu người dùng:', error);
                    navigate('/login');  // Chuyển hướng về trang login nếu có lỗi
                })
                .finally(() => {
                    setLoading(false);  // Dừng trạng thái tải
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('username');  // Xóa username khỏi localStorage
        localStorage.removeItem('token');  // Xóa token khỏi localStorage
        navigate('/login');  // Chuyển hướng về trang login
    };

    const handleUpdateUser = () => {
        navigate('/updateuser');  // Chuyển hướng đến trang cập nhật tài khoản
    };

    if (loading) {
        return <div>Loading...</div>;  // Hiển thị trạng thái tải
    }

    if (!userData) {
        return <div>Không tìm thấy thông tin người dùng</div>;  // Thông báo nếu không có thông tin người dùng
    }

    return (
        <div>
            <h1>Chào mừng, {userData.username || 'Người dùng'}</h1>  {/* Hiển thị username */}
            <h2>Họ và tên: {userData.fullname || 'Chưa có thông tin'}</h2>  {/* Hiển thị fullname */}
            <h3>Địa chỉ: {userData.address || 'Chưa có địa chỉ'}</h3>  {/* Hiển thị address */}
            <h3>Giới tính: {userData.sex || 'Chưa có thông tin'}</h3>  {/* Hiển thị sex */}
            <h3>Email: {userData.email || 'Chưa có email'}</h3>  {/* Hiển thị email */}
            <button onClick={handleUpdateUser}>Cập nhật tài khoản</button>  {/* Nút Cập nhật tài khoản */}
            <button onClick={handleLogout}>Đăng xuất</button>
        </div>
    );
};

export default User;
