import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin from './Admin';
import User from './User';
import { updateUser } from '../../services/AuthService';  // Đảm bảo dịch vụ updateUser đã được định nghĩa
import '../css/Auth.css';  // Import CSS file

// Component UpdateUser
const UpdateUser = () => {
    const role = localStorage.getItem("role")
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [sex, setSex] = useState('');  // Trường sex (male/female)
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // Khởi tạo navigate

    useEffect(() => {
        const token = localStorage.getItem('token');  // Đảm bảo lấy token sau khi trang đã được tải
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        if (sex !== '' && (sex.toLowerCase() !== 'nam' && sex.toLowerCase() !== 'nữ')) {
            setErrorMessage('Giới tính phải là "Nam" hoặc "Nữ"');
            setLoading(false);
            return;
        }

        try {
            const result = await updateUser(fullname, email, sex, address);
            alert(result.message);
            setFullName('');
            setSex('');
            setEmail('');
            setAddress('');
            const role = localStorage.getItem("role")
            role === "admin" ? navigate('/admin') : navigate("/user");
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <User />
            <div className="container">
                <div className="forms show-signup">
                    <div className="form signup">
                        <header>Cập nhật tài khoản</header>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <input type="text" value={fullname} onChange={(e) => setFullName(e.target.value)} placeholder="Nhập tên" />
                            </div>
                            <div className="field">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email" />
                            </div>
                            <div className="field">
                                <input type="text" value={sex} onChange={(e) => setSex(e.target.value)} placeholder="Nhập nam hoặc nữ" />
                            </div>
                            <div className="field">
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Nhập địa chỉ" />
                            </div>
                            <div className="field">
                                <button type="submit" disabled={loading}>{loading ? 'Đang cập nhật tài khoản...' : 'Cập nhật tài khoản'}</button>
                            </div>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

// Xuất khẩu mặc định đối tượng chứa các component
export default UpdateUser;
