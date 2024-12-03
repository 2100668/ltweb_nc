import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Khởi tạo useNavigate
import { fetchNewsById } from '../../services/NewsService';

function NewsDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate(); // Khởi tạo useNavigate để quay lại trang trước
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    const loadNewsDetail = async () => {
      try {
        const response = await fetchNewsById(id); // Lấy tin tức theo ID
        setNews(response.data); // Lưu dữ liệu chi tiết tin tức
        setLoading(false); // Đánh dấu đã tải xong
      } catch (error) {
        setError('Không tìm thấy tin tức này.'); // Thông báo lỗi nếu không lấy được dữ liệu
        setLoading(false);
        console.error('Lỗi khi lấy chi tiết tin tức:', error);
      }
    };
    
    loadNewsDetail(); // Gọi hàm tải chi tiết tin tức
  }, [id]); // Gọi lại mỗi khi ID thay đổi

  // Nếu đang tải dữ liệu hoặc có lỗi, hiển thị thông báo
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!news) {
    return <div>Không tìm thấy tin tức này.</div>;
  }

  return (
    <div>
      <h1>{news.title}</h1>
      <p>{news.content}</p>
      <p><strong>Tác giả:</strong> {news.author}</p>
      <p><strong>Ngày đăng:</strong> {news.date}</p>

      {/* Nút quay lại trang trước */}
      <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Quay lại
      </button>
    </div>
  );
}

export default NewsDetail;
