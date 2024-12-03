import React, { useEffect, useState } from 'react';
import { fetchNews } from '../../services/NewsService'; // Import API service
import { useNavigate } from 'react-router-dom';

function NewsList() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews()
      .then((response) => setNews(response.data)) // Lưu danh sách tin tức
      .catch((error) => console.error('Lỗi khi lấy danh sách tin tức:', error));
  }, []);

  const handleViewDetail = (id) => {
    navigate(`/news/${id}`); // Điều hướng tới trang chi tiết tin tức
  };

  return (
    <div>
      <h1>Danh sách Tin tức</h1>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <button onClick={() => handleViewDetail(item.id)}>{item.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsList;
