// File for Home Product page content
import { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { ProductItem } from "./shop/ProductItem.jsx";

const Home = () => {
    const navigate = useNavigate();

    console.log("testing github action pipeline2")

    const [featuredProducts, setFeaturedProducts] = useState([]); // State to hold featured products
  

    const fetchFeaturedProducts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/products/get/featured/8`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
        
            const data = await response.json();  // Use await to get the resolved data from the Promise
            
            setFeaturedProducts(data);


        } catch (error) {
          console.error('Error fetching featured products:', error);
        }
    };
    
    // Call the function
    useEffect(() => {
        fetchFeaturedProducts();
      }, []);  // Empty dependency array means this effect runs once when the component mounts
    


  return (
    <div className="Home-page">


        <div className="product-container">
            {/* Homepage main image */}
            <div className="main-image-container">
                <div className="main-image">
                    <h1>SereneSpaces Collection Minimalist 2024</h1>
                    <img src={require("../assets/main-img.png")} alt="main"/>
                </div>

                <div className="main-image-detail-container">
                    <div className="main-img-info">
                        <p>Mauris Collection - Collection made from teak wood</p>
                        <p>originating from Indonsia, perfect for minimalist you at home</p>
                    </div>
                    <div className="main-img-btn">
                        <Link to='/shop'><button id="explore-btn">EXPLORE NOW</button></Link>
                        <Link to='/shop/product/67315d755e285c0e2b1851a2'><button id="shop-btn">SHOP NOW - $120.86</button></Link>
                    </div>
                </div>
            </div> 
        </div>



        <div className="FEATURED-PRODUCTS">
            <div className="featured-product-list-header">
                <h1>Featured product</h1>
                <Link to = "/Shop">
                    <button id="see-all-products-btn">SEE ALL PRODUCTS</button>
                </Link>
            </div>
            <div className="featured-product-list">
                
                {featuredProducts.map((product) => (
                    <ProductItem data={product} />
                ))}
                
            </div>
        </div>





        <div className="product-container-3">
            <div className="second-image-container">
                <h1>It's all new,</h1>
                <h1>It all arrived this week</h1>
                <p>Furniture axe heirloom ethical man bun sustainable. Pickled normcore selvage,</p>
                <p>bespoke four dollar toast neutra chartreuse vinyl.</p>
                <Link to='/shop'><button on>DISCOVER OUR SHOP</button></Link><br></br>
                <img src={require('../assets/second-banner-img.png')} alt="second-banner"/>
            </div>
        </div>
    </div>
  );
};

export default Home;
