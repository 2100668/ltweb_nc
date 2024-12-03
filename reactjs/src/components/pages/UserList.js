import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../services/AuthService';
import "../css/UserList.css"

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Danh Sách Tài Khoản</h1>
            <p>Số lượng người dùng: {users.length}</p>
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
                    {users.map((user, index) => (
                        <tr key={user.username}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
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

