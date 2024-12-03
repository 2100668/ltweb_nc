import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate từ react-router-dom
import { updateUser } from '../../services/AuthService.js';  // Đảm bảo dịch vụ updateUser đã được định nghĩa
import '../css/Auth.css';  // Import CSS file

const Update = () => {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [sex, setSex] = useState('');  // Trường sex (male/female)
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // Khởi tạo navigate

    // Kiểm tra nếu đã có token trong localStorage thì chuyển hướng đến trang /user
    useEffect(() => {
        const token = localStorage.getItem('token');  // Đảm bảo lấy token sau khi trang đã được tải
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Hàm xử lý khi form được submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');  // Reset lỗi cũ mỗi lần submit

        // Kiểm tra xem giá trị của sex có hợp lệ không
        if (sex !== '' && (sex.toLowerCase() !== 'nam' && sex.toLowerCase() !== 'nữ')) {
            setErrorMessage('Giới tính phải là "Nam" hoặc "Nữ"');
            setLoading(false);
            return;
        }

        try {
            const result = await updateUser(fullname, email, sex, address);  // Gọi hàm cập nhật từ service
            alert(result.message);  // Hiển thị thông báo từ server
            setFullName('');
            setSex('');
            setEmail('');
            setAddress('');

            // Chuyển hướng đến trang người dùng sau khi cập nhật thành công
            navigate('/user');  // Dẫn người dùng đến trang /user
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
                    <header>Cập nhật tài khoản</header>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <input
                                type="text"  // Đổi type cho email
                                value={fullname}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Nhập tên"
                            />
                        </div>
                        <div className="field">
                            <input
                                type="email"  // Đổi type cho email
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Nhập email"
                            />
                        </div>
                        <div className="field">
                            <input
                                type="text"  // Đổi type cho email
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                                placeholder="Nhập nam hoặc nữ"
                            />
                        </div>
                        <div className="field">
                            <input
                                type="text"  // Đổi type cho email
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Nhập địa chỉ"
                            />
                        </div>  
                        <div className="field">
                            <button type="submit" disabled={loading}>
                                {loading ? 'Đang cập nhật tài khoản...' : 'Cập nhật tài khoản'}
                            </button>
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;
