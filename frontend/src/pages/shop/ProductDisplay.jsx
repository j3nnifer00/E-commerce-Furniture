import "./css/product-display.css"
export const ProductDisplay = ({ product }) => {
    
  return (
    <div className="product-display">
        
        <div className="product-photos">  
        {product.image ? (
            <img src={`../${product.image}`}></img>
        ) : (
            <p>No image available</p>
        )}
        </div>
        <div className="product-details">  
            <h2>Product details</h2>
            <p>{product.description}</p>
        </div>
        <div className="measurements">
            <h2>Measurements</h2>
            <p>measurements</p>
        </div>
        <div className="reviews">
            <h2>Reviews</h2>
            <p>reviews</p>
        </div>
            
    </div>
  )
}
