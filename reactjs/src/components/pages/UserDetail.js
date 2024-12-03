import React, { useEffect, useState } from 'react';
import { getUserDetail } from '../../services/AuthService';
import { useParams } from 'react-router-dom';
import '../css/UserDetail.css';  // Import file CSS

const UserDetail = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const data = await getUserDetail(username);
                setUser(data.user);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUser();
        }
    }, [username]);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="user-detail">
            <h1>Chi tiết tài khoản</h1>
            {user ? (
                <div>
                    <p><span className="label">Tên đăng nhập:</span> {user.username}</p>
                    <p><span className="label">Họ và Tên:</span> {user.fullname || "Chưa có tên"}</p>
                    <p><span className="label">Email:</span> {user.email || "Chưa có email"}</p>
                    <p><span className="label">Giới tính:</span> {user.sex || "Chưa có giới tính"}</p>
                    <p><span className="label">Địa chỉ:</span> {user.address || "Chưa có địa chỉ"}</p>
                    <p><span className="label">Quyền:</span> {user.role}</p>
                </div>
            ) : (
                <p>Không tìm thấy thông tin người dùng.</p>
            )}
        </div>
    );
};

export default UserDetail;
