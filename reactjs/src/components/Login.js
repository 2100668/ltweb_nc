import React, { useState } from 'react';
import { loginUser } from '../services/LoginService.js';  // Giả sử bạn đã có một service cho đăng nhập
import './Register.css';  // Import CSS file

const Login = () => {
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
            const result = await loginUser(username, password);  // Gọi hàm đăng nhập từ service
            alert(result.message);  // Hiển thị thông báo từ server
            setUsername('');
            setPassword('');
            // Điều hướng tới trang chủ hoặc trang người dùng sau khi đăng nhập thành công
            window.location.href = '/dashboard'; // Thay đổi thành URL của bạn
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
