import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/AuthService';
import '../css/Auth.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Kiểm tra nếu có token trong localStorage thì chuyển hướng về trang /user
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/user');
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
            localStorage.setItem('role', result.role);
            const role = localStorage.getItem('role', result.role);

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
                    <header>Đăng Nhập</header>
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
                        <div className="field">
                            <button type="submit" disabled={loading}>
                                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                            </button>
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </form>
                    <div className="form-link">
                        <span>Bạn chưa có tài khoản? <a href="/register">Đăng ký</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
