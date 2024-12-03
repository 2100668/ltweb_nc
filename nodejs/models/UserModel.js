// models/UserModel.js
import db from '../configs/DB.js';

// Hàm kiểm tra người dùng đã tồn tại
export const findUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Hàm tạo người dùng
export const createUser = (username, passwordHash) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(query, [username, passwordHash], (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

export const updateUser = (fullname, email, sex, address, username) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET fullname = ?, address = ?, sex = ?, email = ? WHERE username = ?';
        db.query(query, [fullname, address, sex, email, username], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

export const updatePass = (username, passwordHash) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET password = ? WHERE username = ?';
        db.query(query, [passwordHash, username], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Hàm lấy tất cả người dùng
export const getAllUsersFromDB = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users';
        db.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

export const deleteUserFromDb = (username) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM users WHERE username = ?';
        db.query(query, [username], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};