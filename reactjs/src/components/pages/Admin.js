import React, { useState } from 'react';

const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hàm toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Tên mẫu có thể bấm vào */}
      <button onClick={toggleMenu}>
        Tên Mẫu
      </button>

      {/* Menu sẽ hiển thị khi isMenuOpen là true */}
      {isMenuOpen && (
        <div className="menu">
          <ul>
            <li><button>Cập nhật tài khoản</button></li>
            <li><button>Đăng xuất</button></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
