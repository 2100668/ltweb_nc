import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Dùng axios để gửi yêu cầu HTTP
import '../css/ManageNews.css'; // Import CSS file

const ManageNews = () => {
    const [news, setNews] = useState([]); // Danh sách tin tức
    const [newTitle, setNewTitle] = useState(''); // Tiêu đề tin tức mới
    const [newContent, setNewContent] = useState(''); // Nội dung tin tức mới
    const [editing, setEditing] = useState(false); // Trạng thái chỉnh sửa
    const [editId, setEditId] = useState(null); // ID của tin tức đang chỉnh sửa

    // Tải danh sách tin tức từ backend khi trang được load
    useEffect(() => {
        loadNews();
    }, []);

    // Hàm tải danh sách tin tức
    const loadNews = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/news'); // Lấy tin tức từ API
            setNews(response.data);
        } catch (error) {
            console.error('Lỗi khi tải danh sách tin tức:', error);
        }
    };

    // Hàm thêm tin tức mới vào cơ sở dữ liệu
    const handleAddNews = async () => {
        if (!newTitle.trim() || !newContent.trim()) {
            alert('Vui lòng nhập đầy đủ tiêu đề và nội dung.');
            return;
        }

        try {
            // Gửi yêu cầu POST tới backend để thêm tin tức vào MySQL
            const response = await axios.post('http://localhost:3000/api/news', {
                title: newTitle,
                content: newContent
            });
            alert(response.data); // Hiển thị thông báo thành công từ server
            loadNews(); // Tải lại danh sách tin tức sau khi thêm
            setNewTitle('');
            setNewContent('');
        } catch (error) {
            console.error('Lỗi khi thêm tin tức:', error);
            alert('Lỗi khi thêm tin tức');
        }
    };

    // Hàm chỉnh sửa tin tức
    const handleEditNews = async () => {
        if (!newTitle.trim() || !newContent.trim()) {
            alert('Vui lòng nhập đầy đủ tiêu đề và nội dung.');
            return;
        }

        try {
            await axios.put(`http://localhost:3000/api/news/${editId}`, {
                title: newTitle,
                content: newContent
            });
            loadNews(); // Tải lại danh sách sau khi sửa
            setEditing(false);
            setEditId(null);
            setNewTitle('');
            setNewContent('');
        } catch (error) {
            console.error('Lỗi khi sửa tin tức:', error);
            alert('Lỗi khi sửa tin tức');
        }
    };

    // Hàm xóa tin tức
    const handleDeleteNews = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa tin tức này?')) {
            try {
                await axios.delete(`http://localhost:3000/api/news/${id}`);
                loadNews(); // Tải lại danh sách sau khi xóa
            } catch (error) {
                console.error('Lỗi khi xóa tin tức:', error);
            }
        }
    };

    return (
        <div>
            <h1>Quản lý Tin tức</h1>

            {/* Form thêm tin tức */}
            <div style={{ marginBottom: '20px' }}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="title">Tiêu đề:</label></td>
                            <td><input
                                id="title"
                                type="text"
                                placeholder="Tiêu đề tin tức"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                style={{ padding: '5px', width: '300px' }}
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="content">Nội dung:</label></td>
                            <td><textarea
                                id="content"
                                placeholder="Nội dung tin tức"
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                style={{ padding: '5px', width: '100%', height: '80px' }}
                            ></textarea></td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign: 'center' }}>
                                {editing ? (
                                    <button onClick={handleEditNews} style={{ padding: '5px 10px' }}>
                                        Cập nhật Tin tức
                                    </button>
                                ) : (
                                    <button onClick={handleAddNews} style={{ padding: '5px 10px' }}>
                                        Thêm Tin tức
                                    </button>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Danh sách tin tức */}
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tiêu đề</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nội dung</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map((item) => (
                        <tr key={item.idtintuc}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.tieude}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.noidung}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <button
                                    onClick={() => handleDeleteNews(item.idtintuc)}
                                    style={{ padding: '5px 10px', backgroundColor: 'red', color: '#fff', border: 'none' }}
                                >
                                    Xóa
                                </button>
                                <button
                                    onClick={() => {
                                        setEditing(true);
                                        setEditId(item.idtintuc);
                                        setNewTitle(item.tieude);
                                        setNewContent(item.noidung);
                                    }}
                                    style={{ padding: '5px 10px', backgroundColor: 'blue', color: '#fff', border: 'none' }}
                                >
                                    Sửa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageNews;
