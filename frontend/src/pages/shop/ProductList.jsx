
import { useState, useEffect } from "react";
import {ProductItem} from "./ProductItem";
import "./css/productList.css";

export const ProductList = (props) => {
    const [products, setAllProducts] = useState([]);
  

    const fetchAllProducts = async () => {
        try {
            const response = await fetch(`/api/v1/products/`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
        
            const data = await response.json();

            setAllProducts(data);
        } catch (error) {
            console.error('Error fetching featured products:', error);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);  // Empty dependency array means this effect runs once when the component mounts

    
    return (
        <div className="product-list">
            <h1>All Products</h1>
            <div className="products-gallery">
                {products.map((product) => (
                    <ProductItem data={product} />
                ))}
            </div>
            <hr />
            <div className="show-result-container">
              <p>showing {products.length} results</p>
              <div class="show-result-meterbar">
                <div class="show-result-meterbar-color"></div>
              </div>
              <button>Show more</button>
            </div>
        </div>
    )
}
