import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../css/product/product.module.css'; // Import the CSS module

const ProductList = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [phoneProducts, setPhoneProducts] = useState([]);
  const [laptopProducts, setLaptopProducts] = useState([]);
  const [accessoryProducts, setAccessoryProducts] = useState([]);

  useEffect(() => {
    // Fetch data for "SẢN PHẨM MỚI"
    axios.get('http://localhost:3000/api/v1/newproduct')
      .then(response => setNewProducts(response.data.products))
      .catch(error => console.error('Error fetching new products:', error));

    // Fetch data for "ĐIỆN THOẠI 1"
    axios.get('http://localhost:3000/api/v1/getproductbycategory/1')
      .then(response => setPhoneProducts(response.data.productbycategory))
      .catch(error => console.error('Error fetching phone products:', error));

    // Fetch data for "ĐIỆN THOẠI 2"
    axios.get('http://localhost:3000/api/v1/getproductbycategory/2')
      .then(response => setLaptopProducts(response.data.productbycategory))
      .catch(error => console.error('Error fetching laptop products:', error));

    // Fetch data for "ĐIỆN THOẠI 3"
    axios.get('http://localhost:3000/api/v1/getproductbycategory/3')
      .then(response => setAccessoryProducts(response.data.productbycategory))
      .catch(error => console.error('Error fetching accessory products:', error));
  }, []);

  const renderProduct = (products) => {
    return products.map((product) => (
      <div className={styles.productProduct} key={product.masp}>
        <Link to={`/deltaproduct/${product.masp}`}>
          <div>
            <img className={styles.productImg} src={`http://localhost:3000/images/product/${product.hinhanh}`} alt="" />
            <div className={styles.productImgOverlay}>
              <div className={styles.productHoverIcons}>
                <i className="fas fa-search"></i>
              </div>
            </div>
            <h2>{product.ten}</h2>
            <div className={styles.productPrice}>
              <span className={styles.originalPrice}>{new Intl.NumberFormat().format(product.gia * 1.2)}Đ</span>
              <span className={styles.discountPrice}>{new Intl.NumberFormat().format(product.gia)}</span>
            </div>
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div>
      {/* SẢN PHẨM MỚI */}
      <div className={styles.productContainer}>
        <div className={styles.productTitle}>SẢN PHẨM MỚI</div>
        <div className={styles.productTagProduct}>
          {newProducts.length > 0 ? renderProduct(newProducts) : <p>Loading...</p>}
        </div>
        <div className={styles.productMore}>
          <Link to="?controller=contentbycategory&action=ProductList&new_products&page=1">
            <div className={styles.moreButton}>
              <i className="fas fa-arrow-right"></i>
              Xem thêm
            </div>
          </Link>
        </div>
      </div>

      {/* ĐIỆN THOẠI 1 */}
      <div className={styles.productContainer}>
        <div className={styles.productTitle}>ĐIỆN THOẠI 1</div>
        <div className={styles.productTagProduct}>
          {phoneProducts.length > 0 ? renderProduct(phoneProducts) : <p>Loading...</p>}
        </div>
        <div className={styles.productMore}>
          <Link to="?controller=contentbycategory&action=ProductList&category_id=1&page=1">
            <div className={styles.moreButton}>
              <i className="fas fa-arrow-right"></i>
              Xem thêm
            </div>
          </Link>
        </div>
      </div>

      {/* ĐIỆN THOẠI 2 */}
      <div className={styles.productContainer}>
        <div className={styles.productTitle}>ĐIỆN THOẠI 2</div>
        <div className={styles.productTagProduct}>
          {laptopProducts.length > 0 ? renderProduct(laptopProducts) : <p>Loading...</p>}
        </div>
        <div className={styles.productMore}>
          <Link to="?controller=contentbycategory&action=ProductList&category_id=2&page=1">
            <div className={styles.moreButton}>
              <i className="fas fa-arrow-right"></i>
              Xem thêm
            </div>
          </Link>
        </div>
      </div>

      {/* ĐIỆN THOẠI 3 */}
      <div className={styles.productContainer}>
        <div className={styles.productTitle}>ĐIỆN THOẠI 3</div>
        <div className={styles.productTagProduct}>
          {accessoryProducts.length > 0 ? renderProduct(accessoryProducts) : <p>Loading...</p>}
        </div>
        <div className={styles.productMore}>
          <Link to="?controller=contentbycategory&action=ProductList&category_id=3&page=1">
            <div className={styles.moreButton}>
              <i className="fas fa-arrow-right"></i>
              Xem thêm
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
