import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Lấy danh sách tin tức
export const fetchNews = () => {
  return axios.get(`${API_URL}/news`);
};

// Lấy tin tức theo ID
export const fetchNewsById = (id) => {
  return axios.get(`${API_URL}/news/${id}`);
};

// Thêm tin tức
export const createNews = (news) => {
  return axios.post(`${API_URL}/news`, news);
};

// Cập nhật tin tức
export const updateNews = (id, updatedNews) => {
  return axios.put(`${API_URL}/news/${id}`, updatedNews);
};

// Xóa tin tức
export const deleteNews = (id) => {
  return axios.delete(`${API_URL}/news/${id}`);
};
