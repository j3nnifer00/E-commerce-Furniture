
import React, { useState , useContext} from 'react';

import { ShopContext } from '../../context/ShopContext';

const ProductAddToCart = ({ product }) => {
   const { addToCart } = useContext(ShopContext);
   const [quantity, setQuantity] = useState(1);
   const [error, setError] = useState("");


   const increaseQuantity = () => {
    if (quantity < product.countInStock){
      setQuantity(quantity + 1);
    }
     
   };
   const decreaseQuantity = () => {
     if (quantity > 0) {
       setQuantity(quantity - 1);
     }
   };

   const handleAddToBagBtn = () => {
      if (quantity===0){
        setError("cannot select 0 item");
        setTimeout(() => {
          setError(null);
        }, 1000)
        
        return;
      }

      const added = addToCart(product._id, quantity, product.price, product.countInStock);


      if (added) {
        alert("item added")
      } else {
        setError("failed to add")

        setTimeout(() => {
          setError(null);
        }, 1000)
      }
   };


    if (!product) {
      return <div>Loading...</div>; 
    }
  




  return (
    <div className="productAddToCart">
      <div className="product-add-to-cart">
        
        
        <div className="product-info">
          
          <div className="product-title-container">
            <div className="product-title">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
            <button className="material-symbols-outlined" id="favorite-btn">
              favorite
            </button>
          </div>

          <h2>${product.price}</h2>

          <br />
          {/* {[...Array(product.rating)].map((_, index) => (
            <span key={index} className="material-symbols-outlined">
              star
            </span>
          ))} */}
        </div>
        {/* <div className="option-container">
          <h4>Choose options</h4>
          <p>{product.color}</p>
        </div> */}


        <div className="delivery-method-container">
          <div className="delivery-method-label">
            <h4>How to get it</h4>
            <span className="change-store-btn">Change store</span>
          </div>

          <div className="delivery-method-availability">
            <div className="package-delivery">
              <div className="package-delivery-header">
                <span className="material-symbols-outlined">local_shipping</span>
                <h4>Delivery to 4000</h4>
              </div>
              <div className="package-delivery-body">
                <p>
                  <span className="material-symbols-outlined available-icon">circle</span>
                  Available
                </p>
              </div>
            </div>

            <hr />

            <div className="pickup-delivery">
              <div className="pickup-delivery-header">
                <span className="material-symbols-outlined">store</span>
                <h4>Brisbane</h4>
              </div>
              <div className="pickup-delivery-body">
                <p>
                  <span className="material-symbols-outlined available-icon">circle</span>
                  Click & Collect
                </p>
                <p>
                  <span className="material-symbols-outlined available-icon">circle</span>
                  Store
                </p>
              </div>
            </div>
          </div>
        </div>



        <div className="add-to-bag-btns">
          <div className="add-to-bag-quantity">
            <button className="decrease-btn" onClick={decreaseQuantity}>
              <span className="material-symbols-outlined">remove</span>
            </button>
            <p>{quantity}</p>
            <button className="increase-btn" onClick={increaseQuantity}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <button onClick={handleAddToBagBtn}>Add to bag</button>
        </div>
        <div>{error && <div className="error">{error}</div>}</div>



        
        <div className="return-info-container">
          <div className="product-details-container-right-header">
            <span className="material-symbols-outlined">refresh</span>
            <h4>Returns</h4>
          </div>
          <p>It's OK to change your mind. You can return your products for a full refund within 365 days of purchase.</p>
          <p id="exclusion-info">*Exclusions apply.</p>
        </div>
        <div className="assembly-service-info-container">
          <div className="product-details-container-right-header">
            <span className="material-symbols-outlined">hardware</span>
            <h4>Assembly service</h4>
          </div>
          <p>
            <span className="material-symbols-outlined unavailable-icon">block</span>
            Information currently unavailable
          </p>
        </div>
        <div className="warning-conatiner">
          <div className="product-details-container-right-header">
            <span className="material-symbols-outlined">warning</span>
            <h4>Must be well-attached to help prevent tipover</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAddToCart;
