import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';  // Thêm useNavigate để điều hướng
import "../css/UserList.css";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');  // State lưu trữ từ khoá tìm kiếm
    const navigate = useNavigate();  // Khởi tạo hook điều hướng

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data.users);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (username) => {
        const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xoá tài khoản "${username}"?`);
    
        if (isConfirmed) {
            try {
                await deleteUser(username);  // Gọi hàm xóa tài khoản
                setUsers(users.filter(user => user.username !== username)); // Cập nhật lại danh sách người dùng
                alert('Xoá tài khoản thành công');
            } catch (error) {
                alert(error.message || 'Lỗi khi xoá tài khoản');
            }
        }
    };

    const handleUserClick = (username) => {
        navigate(`/user/${username}`);  // Điều hướng đến trang chi tiết của người dùng
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) // Tìm kiếm theo tên tài khoản
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Danh Sách Tài Khoản</h1>
            <p>Số lượng người dùng: {users.length}</p>

            {/* Ô tìm kiếm */}
            <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật state khi người dùng nhập
            />

            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên đăng nhập</th>
                        <th>Quyền</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user.username}>
                            <td>{index + 1}</td>
                            <td style={{ cursor: 'pointer' }} onClick={() => handleUserClick(user.username)}>
                                {user.username}
                            </td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleDelete(user.username)}>Xoá</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
