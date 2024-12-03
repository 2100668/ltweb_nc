import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import User from './components/pages/User'; 
import Update from './components/pages/Update';
import UpdatePass from './components/pages/UpdatePass';
import Admin from './components/pages/Admin';
import AdminProfile from './components/pages/AdminProfile';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<User />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user" element={<User />} /> 
                <Route path="/update" element={<Update />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/updatePass" element={<UpdatePass />} />
                <Route path="/adminProfile" element={<AdminProfile />} />
            </Routes>
        </Router>
    );
};

export default App;
