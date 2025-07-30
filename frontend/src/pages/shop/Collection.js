import { useState, useEffect } from "react";
import './css/collection.css';
import { Link } from 'react-router-dom';

const Collection = () => {
  const [collectionProducts, setCollectionProducts] = useState([]);

  const fetchCollectionProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/products/get/collection`);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setCollectionProducts(data.data);

    } catch (error) {
      console.error('Error fetching collection products:', error);
    }
  };

  useEffect(() => {
    fetchCollectionProducts();
  }, []);

  return (
    <div className="collection">

      <div className="COLLECTION-PRODUCTS">
        <div className="collection-product-list-header">
          <h1>2024 Serene Spaces Collection</h1>
        </div>
        <div className="collection-gallery">
          {collectionProducts.map((product) => (
            <div className="collection-item" key={product._id}>
              <Link to={`/shop/product/${product._id}`} style={{ textDecoration: 'none' }}>
                <div className="product-card">
                  <p className="product-description">{product.richDescription}</p>
                  <img className="product-img" src={`../${product.image}`}/>
                  <div className="description">
                      <p className="product-name">{product.name}</p>
                      <p className="product-price">${product.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
