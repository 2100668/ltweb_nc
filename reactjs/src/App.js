import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import User from './components/pages/User';
import Update from './components/pages/Update';
import UpdatePass from './components/pages/UpdatePass';
import Admin from './components/pages/Admin';
import Profile from './components/pages/Profile';
import UserList from './components/pages/UserList';
import UserDetail from './components/pages/UserDetail';
import AddUser from './components/pages/AddUser.js';
// -------------------------------------------------- phat
import NewsList from './components/pages/NewsList.js';
import ManageNews from './components/pages/ManageNews.js';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user" element={<User />} />
                <Route path="/update" element={<Update />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/updatePass" element={<UpdatePass />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/user/:username" element={<UserDetail />} />
                <Route path="/addUser" element={<AddUser />} />
                {/* -------------------------------------------- phat */}
                <Route path="/newsList" element={<NewsList />} />
                <Route path="/managerNews" element={<ManageNews />} />
            </Routes>
        </Router>
    );
};

export default App;
