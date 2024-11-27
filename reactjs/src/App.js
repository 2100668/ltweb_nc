import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';  // Giả sử bạn đã tạo trang người dùng

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<User />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user" element={<User />} />  {/* Trang người dùng */}
                {/* Các route khác */}
            </Routes>
        </Router>
    );
};

export default App;
