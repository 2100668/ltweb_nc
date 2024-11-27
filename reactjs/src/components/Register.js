import React, { useState } from 'react';
import { registerUser } from '../services/AuthService.js';
import './Auth.css';  // Import CSS file

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Hàm xử lý khi form được submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');  // Reset lỗi cũ mỗi lần submit

        try {
            const result = await registerUser(username, password);  // Gọi hàm đăng ký từ service
            alert(result.message);  // Hiển thị thông báo từ server
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);  // Hiển thị lỗi từ server hoặc mạng
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="forms show-signup">
                <div className="form signup">
                    <header>Đăng Ký</header>
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
                                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                            </button>
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </form>
                    <div className="form-link">
                        <span>Bạn đã có tài khoản? <a href="/login">Đăng nhập</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
