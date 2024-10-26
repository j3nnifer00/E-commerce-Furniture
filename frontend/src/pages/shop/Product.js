// File for Product Details page content
import { ProductDisplay } from "./ProductDisplay";
import ProductAddToCart from "./ProductAddToCart";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./css/Product.css"

import axios from 'axios';


const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/v1/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="Product">
        
      <ProductDisplay product={product}/>
      <ProductAddToCart product={product} />
  
    </div>
  );
};

export default Product;
