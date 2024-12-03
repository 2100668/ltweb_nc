import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate từ react-router-dom
import { addUser } from '../../services/AuthService';
import Admin from './Admin';
import '../css/Auth.css';  // Import CSS file

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');  // Thêm state cho quyền
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // Khởi tạo navigate

    // Kiểm tra nếu đã có token trong localStorage thì chuyển hướng đến trang /user
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Hàm xử lý khi form được submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');  // Reset lỗi cũ mỗi lần submit

        // Kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự');
            setLoading(false);
            return;
        }

        try {
            const result = await addUser(username, password, role);  // Gọi hàm đăng ký từ service
            alert(result.message);  // Hiển thị thông báo từ server
            setUsername('');
            setPassword('');
            navigate("/users");  // Dẫn người dùng đến trang /user

        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);  // Hiển thị lỗi từ server hoặc mạng
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Admin />
            <div className="container">
                <div className="forms show-signup">
                    <div className="form signup">
                        <header>Cấp Tài Khoản</header>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder="Nhập tên đăng nhập"
                                />
                            </div>
                            <div className="field">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Nhập mật khẩu"
                                />
                            </div>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            <div className="field">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Đang đăng ký...' : 'Cấp Tài Khoản'}
                                </button>
                            </div>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Register;
