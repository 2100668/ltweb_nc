import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/AuthService';
import '../css/Auth.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Thêm state cho role
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Kiểm tra nếu có token trong localStorage thì chuyển hướng về trang /user
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const result = await loginUser(username, password);
            alert(result.message);
            localStorage.setItem('token', result.token);  // Lưu token vào localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('role', role); // Lưu role vào localStorage

            if (role === "admin") {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="forms show-login">
                <div className="form login">
                    <header>Cấp tài khoản</header>
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
                        {/* Thêm nút chọn role */}
                        <div className="field">
                            <select 
                                value={role} 
                                onChange={(e) => setRole(e.target.value)} 
                                required
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="field">
                            <button type="submit" disabled={loading}>
                                {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
                            </button>
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
