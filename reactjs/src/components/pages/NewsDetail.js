import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Thêm useNavigate để quay lại trang trước
import { fetchNewsById } from '../../services/NewsService';

function NewsDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    fetchNewsById(id)
      .then((response) => {
        setNews(response.data); // Lưu dữ liệu chi tiết tin tức
        setLoading(false); // Đánh dấu là đã tải xong
      })
      .catch((error) => {
        setError('Không tìm thấy tin tức này'); // Thông báo lỗi nếu có
        setLoading(false);
        console.error('Lỗi khi lấy chi tiết tin tức:', error);
      });
  }, [id]);

  // Nếu đang tải dữ liệu hoặc có lỗi, hiển thị thông báo
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!news) {
    return <div>Không tìm thấy tin tức</div>;
  }

  return (
    <div>
      <h1>{news.title}</h1>
      <p>{news.content}</p>
      <p><strong>Tác giả:</strong> {news.author}</p>
      <p><strong>Ngày đăng:</strong> {news.date}</p>

      {/* Nút quay lại */}
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
}

export default NewsDetail;
