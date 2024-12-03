import React, { useEffect, useState } from 'react';
import { getUser } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import '../css/User.css';

const User = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      getUser()
        .then((data) => {
          setUserData(data.user);
        })
        .catch(() => navigate('/login'))
        .finally(() => setLoading(false));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleViewNews = () => {
    navigate('/newslist'); // Điều hướng đến danh sách tin tức
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Chào mừng, {userData?.fullname || 'User'}!</h1>
      <button onClick={handleViewNews}>Xem Tin Tức</button> {/* Nút xem tin tức */}
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
};

export default User;
