import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser, getUser } from '../../services/AuthService';
import '../css/Auth.css';  // Import CSS file

// Component UpdateUser
const UpdateUser = () => {
    const [userData, setUserData] = useState("");  // Trạng thái lưu dữ liệu người dùng
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
        } {
            // Gọi API để lấy thông tin người dùng
            getUser()
                .then((data) => {

                    setUserData(data.user);  // Lưu dữ liệu người dùng vào trạng thái
                })
                .catch((error) => {
                    console.error('Lỗi khi lấy dữ liệu người dùng:', error);
                    navigate('/login');  // Chuyển hướng về trang login nếu có lỗi
                })
                .finally(() => {
                    setLoading(false);  // Dừng trạng thái tải
                });
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
            window.location.reload()
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="container">
            <div className="forms show-signup">
                <div className="form signup">
                    <header>{userData.username}</header>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <input type="text" value={fullname} onChange={(e) => setFullName(e.target.value)} placeholder={userData.fullname || "Chưa có tên"} />
                        </div>
                        <div className="field">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={userData.email || "Chưa có email"} />
                        </div>
                        <div className="field">
                            <input type="text" value={sex} onChange={(e) => setSex(e.target.value)} placeholder={userData.sex || "Chưa có giới tính"} />
                        </div>
                        <div className="field">
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={userData.address || "Chưa có địa chỉ"} />
                        </div>
                        <div className="field">
                            <input type="text" value={userData.role} disabled />
                        </div>
                        <div className="field">
                            <button type="submit" disabled={loading}>{loading ? 'Đang cập nhật tài khoản...' : 'Cập nhật tài khoản'}</button>
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

// Xuất khẩu mặc định đối tượng chứa các component
export default UpdateUser;
