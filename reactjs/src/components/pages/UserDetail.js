// src/components/pages/UserDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../services/AuthService'; // Import hàm lấy thông tin người dùng

const UserDetail = () => {
    const { username } = useParams(); // Lấy username từ URL
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser(username); // Gọi API để lấy thông tin người dùng
                setUser(data.user);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [username]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Thông tin chi tiết người dùng</h1>
            <p><strong>Tên đăng nhập:</strong> {user.username}</p>
            <p><strong>Họ và tên:</strong> {user.fullname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Giới tính:</strong> {user.sex}</p>
            <p><strong>Địa chỉ:</strong> {user.address}</p>
            <p><strong>Vai trò:</strong> {user.role}</p>
        </div>
    );
};

export default UserDetail;
