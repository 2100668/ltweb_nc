import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePass } from '../../services/AuthService';
import Admin from './Admin';
import User from './User';
import '../css/Auth.css';  // Import CSS file

const UpdatePass = () => {
    const role = localStorage.getItem("role")
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
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

        if (oldPass.length < 6 && newPass.length < 6) {
            setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự');
            setLoading(false);
            return;
        }

        try {
            const result = await updatePass(oldPass, newPass);
            alert(result.message);
            setOldPass('');
            setNewPass('');
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
            {role === "admin" ? <Admin /> : <User />}
            <div className="container">
                <div className="forms show-signup">
                    <div className="form signup">
                        <header>Đổi mật khẩu</header>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <input type="password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} placeholder="Nhập mật khẩu cũ" />
                            </div>
                            <div className="field">
                                <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Nhập mật khẩu mới" />
                            </div>
                            <div className="field">
                                <button type="submit" disabled={loading}>{loading ? 'Đang đổi mật khẩu...' : 'Đổi mật khẩu'}</button>
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
export default UpdatePass;
