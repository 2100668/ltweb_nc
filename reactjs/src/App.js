import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import UserPage from './components/User';  // Giả sử bạn đã có trang người dùng
import Login from './components/Login';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user" element={<UserPage />} />  {/* Trang người dùng */}
                {/* Các route khác */}
            </Routes>
        </Router>
    );
};

export default App;
