import axios from 'axios';

const API_URL = 'http://localhost:3000/api/news';

export const fetchNews = () => axios.get(API_URL);
export const fetchNewsById = (id) => axios.get(`${API_URL}/${id}`);
export const createNews = (data) => axios.post(API_URL, data);
export const updateNews = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteNews = (id) => axios.delete(`${API_URL}/${id}`);
