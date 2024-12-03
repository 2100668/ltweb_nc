// src/services/authService.js
import axios from 'axios';

const apiUrl = "http://localhost:3000/api";

// Hàm đăng ký
export const registerUser = async (username, password) => {
    try {
        const response = await axios.post(`${apiUrl}/register`, {
            username,
            password,
        });
        return response.data;  // Trả về dữ liệu từ server (thông báo thành công)
    } catch (error) {
        if (error.response) {
            // Trả về lỗi từ server nếu có (status code != 2xx)
            throw new Error(error.response.data.error || error.response.data.message);
        } else {
            // Trả về lỗi mạng hoặc không phản hồi
            throw new Error('Network Error');
        }
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${apiUrl}/login`, { username, password });
        return response.data; // Trả về { message, token, role }
    } catch (error) {
        throw new Error(error.response?.data.error || 'Network Error');
    }
};


export const getUser = async () => {
    try {
        // Lấy username từ localStorage
        const username = localStorage.getItem('username');

        if (!username) {
            throw new Error('Username not found in localStorage');
        }

        // Lấy token từ localStorage để gửi trong header Authorization
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token not found in localStorage');
        }

        // Gửi yêu cầu GET để lấy thông tin người dùng
        const response = await axios.get(`${apiUrl}/user/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Gửi token trong header để xác thực
            }
        });

        // Trả về dữ liệu người dùng từ server
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Error fetching user');
    }
};

export const updateUser = async (fullname, email, sex, address) => {
    try {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if (!username || !token) {
            throw new Error('Username or Token not found in localStorage');
        }

        const response = await axios.put(`${apiUrl}/user/${username}`,
            { fullname, email, sex, address },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Error updating user');
    }
};

export const updatePass = async (oldPass, newPass) => {
    try {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        const response = await axios.put(`${apiUrl}/updatePass/${username}`,
            { oldPass, newPass },  // Gửi cả mật khẩu cũ và mới
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data.error || 'Network Error');
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/users`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Network Error');
    }
};

export const deleteUser = async (username) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${apiUrl}/user/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data; // Trả về thông báo thành công
    } catch (error) {
        throw new Error(error.response?.data.error || 'Network Error');
    }
};

export const getUserDetail = async (username) => {
    try {

        if (!username) {
            throw new Error('Username not found in localStorage');
        }

        // Lấy token từ localStorage để gửi trong header Authorization
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token not found in localStorage');
        }

        // Gửi yêu cầu GET để lấy thông tin người dùng
        const response = await axios.get(`${apiUrl}/user/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Gửi token trong header để xác thực
            }
        });

        // Trả về dữ liệu người dùng từ server
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Error fetching user');
    }
};