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
        const response = await axios.post(apiUrl, { username, password });
        return response.data;  // Trả về dữ liệu từ server
    } catch (error) {
        throw new Error(error.response ? error.response.data.error || error.response.data.message : 'Network Error');
    }
};