import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate từ react-router-dom
import { registerUser } from '../../services/AuthService';
import '../css/Auth.css';  // Import CSS file

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // Khởi tạo navigate

    // Kiểm tra nếu đã có token trong localStorage thì chuyển hướng đến trang /user
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/user');
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
            const result = await registerUser(username, password);  // Gọi hàm đăng ký từ service
            alert(result.message);  // Hiển thị thông báo từ server
            setUsername('');
            setPassword('');

            // Lưu token vào localStorage nếu đăng ký thành công
            localStorage.setItem('token', result.token);  // Lưu token vào localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('role', result.role);

            // Kiểm tra role và điều hướng tương ứng
            const role = localStorage.getItem('role');
            if (role === "admin") {
                navigate('/admin');  // Dẫn người dùng đến trang /admin
            } else {
                navigate("/user");  // Dẫn người dùng đến trang /user
            }
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
