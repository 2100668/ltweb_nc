import React, { useEffect, useState } from 'react';
import { getUserDetail } from '../../services/AuthService';  // Dùng hàm getUser để lấy thông tin người dùng
import { useParams } from 'react-router-dom';  // Dùng useParams để lấy username từ URL

const UserDetail = () => {
    const { username } = useParams();  // Lấy username từ params trong URL
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Nếu username có thay đổi, fetch lại thông tin người dùng
        const fetchUser = async () => {
            try {
                setLoading(true);  // Đánh dấu bắt đầu tải lại
                const data = await getUserDetail(username);  // Gọi API lấy thông tin người dùng theo username
                setUser(data.user);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUser();  // Nếu username tồn tại, gọi API
        }
    }, [username]);  // Theo dõi khi username thay đổi

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Chi tiết tài khoản</h1>
            {user ? (
                <div>
                    <p><strong>Tên đăng nhập:</strong> {user.username}</p>
                    <p><strong>Họ và Tên:</strong> {user.fullname || "Chưa có tên"}</p>
                    <p><strong>Email:</strong> {user.email || "Chưa có email"}</p>
                    <p><strong>Giới tính:</strong> {user.sex || "Chưa có giới tính"}</p>
                    <p><strong>Địa chỉ:</strong> {user.address || "Chưa có địa chỉ"}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            ) : (
                <p>Không tìm thấy thông tin người dùng.</p>
            )}
        </div>
    );
};

export default UserDetail;
