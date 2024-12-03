import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import User from './components/pages/User';  // Giả sử bạn đã tạo trang người dùng
import Update from './components/pages/Update';  // Giả sử bạn đã tạo trang người dùng
import NewsList from './components/pages/NewsList';  // Danh sách tin tức
import NewsDetail from './components/pages/NewsDetail';  // Chi tiết tin tức

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<User />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user" element={<User />} />  {/* Trang người dùng */}
                <Route path="/update" element={<Update />} />  {/* Trang người dùng */}
                
                {/* Các route liên quan đến Tin tức */}
                <Route path="/news" element={<NewsList />} />  {/* Danh sách tin tức */}
                <Route path="/news/:id" element={<NewsDetail />} />  {/* Chi tiết tin tức */}
            </Routes>
        </Router>
    );
};

export default App;
