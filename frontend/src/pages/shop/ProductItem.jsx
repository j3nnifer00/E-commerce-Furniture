import React from 'react';
import { Link } from 'react-router-dom';
import './css/ProductItem.css';

export const ProductItem = (props) => {

    const { _id, name, price, image} = props.data;

    console.log("ProductItem data:", props.data);
    return (
        <div className='product-item'>
            <Link to={`/shop/product/${_id}`} style={{ textDecoration: 'none' }}>
            <div className="product-card">
                <img src={image}/>
                <div className="description">
                    <p className="product-name">{name}</p>
                    <p className="product-price">${price}</p>
                </div>
            </div>
            </Link>
        </div>
    )
}