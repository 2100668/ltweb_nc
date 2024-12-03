import React, { useEffect, useState } from 'react';
import { getUser } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import '../css/User.css';

const User = () => {
    const navigate = useNavigate();  // Khởi tạo navigate
    const [userData, setUserData] = useState(null);  // Trạng thái lưu dữ liệu người dùng
    const [loading, setLoading] = useState(true);  // Trạng thái tải dữ liệu

    useEffect(() => {
        const token = localStorage.getItem('token');  // Lấy token từ localStorage
        const role = localStorage.getItem('role');

        if (!token) {
            navigate('/login');  // Chuyển hướng về trang login nếu không có token
        } else if (role === 'admin') {
            navigate('/admin');
        }
        else {
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
        localStorage.removeItem('role');  // Xóa role khỏi localStorage
        navigate('/login');  // Chuyển hướng về trang login
    };

    const handleUpdateUser = () => {
        navigate('/update');  // Chuyển hướng đến trang cập nhật tài khoản
    };

    if (loading) {
        return <div>Loading...</div>;  // Hiển thị trạng thái tải
    }

    if (!userData) {
        return <div>Không tìm thấy thông tin người dùng</div>;  // Thông báo nếu không có thông tin người dùng
    }

    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-6 mb-4 mb-lg-0">
                        <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                            <div className="row g-0">
                                <div className="col-md-4 gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderTopRightRadius: '.5rem' }}>
                                    <h6>{userData.username}</h6>
                                    <i className="far fa-edit mb-5"></i>
                                </div>
                                <div>
                                    <div className="card-body p-4">
                                        <h6>Thông tin cá nhân</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Tên</h6>
                                                <p className="text-muted">{userData.fullname || 'Chưa có email'}</p>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h6>Email</h6>
                                                <p className="text-muted">{userData.email || 'Chưa có địa chỉ'}</p>
                                            </div>
                                        </div>
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Giới tính</h6>
                                                <p className="text-muted">{userData.sex || 'Chưa có địa chỉ'}</p>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h6>Địa chỉ</h6>
                                                <p className="text-muted">{userData.address || 'Chưa có địa chỉ'}</p>
                                                <h6>Quyền truy cập</h6>
                                                <p className="text-muted">{userData.role}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-start">
                                            <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                                            <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                                            <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleUpdateUser}>Cập nhật tài khoản</button>  {/* Nút Cập nhật tài khoản */}
                        <button onClick={handleLogout}>Đăng xuất</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default User;
