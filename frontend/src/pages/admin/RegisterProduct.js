import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./css/registerProduct.css"

const RegisterProduct = () => {
    let { productId } = useParams();
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productRichDescription, setProductRichDescription] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImages, setProductImages] = useState([]);
    const [productCategory, setProductCategory] = useState('');
    const [productStock, setProductStock] = useState(0);
    const [productRating, setProductRating] = useState(0);
    const [productReviewsNum, setProductReviewNums] = useState(0);
    const [productFeatured, setProductFeatured] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`/api/v1/category`); // 카테고리 API 엔드포인트
                setCategories(response.data); // 카테고리 리스트 저장
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();

        if (productId) {
            axios.get(`/api/v1/products/${productId}`)
                .then((response) => {
                    const product = response.data;
                    setProductName(product.name);
                    setProductDescription(product.description);
                    setProductRichDescription(product.richDescription);
                    setProductBrand(product.brand);
                    setProductPrice(product.price);
                    setProductCategory(product.category._id); // category.id 사용
                    setProductStock(product.countInStock);
                    setProductRating(product.rating);
                    setProductReviewNums(product.numReviews);
                    setProductFeatured(product.isFeatured);
                })
                .catch((error) => setError("Error fetching product data"));
        }
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('richDescription', productRichDescription);
        formData.append('brand', productBrand);
        formData.append('price', productPrice);
        formData.append('category', productCategory); // ID로 카테고리 전송
        formData.append('countInStock', productStock);
        formData.append('rating', productRating);
        formData.append('numReviews', productReviewsNum);
        formData.append('isFeatured', productFeatured);

        // 이미지 파일들 추가
        for (let i = 0; i < productImages.length; i++) {
            formData.append('image', productImages[i]);
        }

        try {
            if (productId) { // 수정 모드
                await axios.put(`/api/v1/products/${productId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else { // 등록 모드
                await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            // 성공 후 상태 초기화
            setProductName('');
            setProductDescription('');
            setProductRichDescription('');
            setProductBrand('');
            setProductPrice(0);
            setProductImages([]);
            setProductCategory('');
            setProductStock(0);
            setProductRating(0);
            setProductReviewNums(0);
            setProductFeatured(false);
            setError(null);

            navigate('/admin');
        } catch (error) {
            console.log(error);
            setError('Error submitting the product');
        }
    };

    return (
        <div className="registerProduct">
            <form onSubmit={handleSubmit}>
                {/* 폼 필드들 */}
                <label htmlFor="productName">Product Name</label>
                <input
                    type="text"
                    id="productName"
                    name="name"
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                />
                <label htmlFor="productDescription">Product Description</label>
                <input
                    type="text"
                    id="productDescription"
                    name="description"
                    onChange={(e) => setProductDescription(e.target.value)}
                    value={productDescription}
                />
                <label htmlFor="productRichDescription">Product Rich Description</label>
                <input
                    type="text"
                    id="productRichDescription"
                    name="richDescription"
                    onChange={(e) => setProductRichDescription(e.target.value)}
                    value={productRichDescription}
                />
                <label htmlFor="productBrand">Product Brand</label>
                <input
                    type="text"
                    id="productBrand"
                    name="brand"
                    onChange={(e) => setProductBrand(e.target.value)}
                    value={productBrand}
                />
                <label htmlFor="productPrice">Product Price</label>
                <input
                    type="number"
                    id="productPrice"
                    name="price"
                    onChange={(e) => setProductPrice(e.target.value)}
                    value={productPrice}
                />
                <label htmlFor="productImages">Select image:</label>
                <input
                    type="file"
                    id="productImages"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setProductImages([...e.target.files])}
                    multiple
                />
                <label htmlFor="productCategory">Product Category</label>
                <select
                    id="productCategory"
                    name="category"
                    onChange={(e) => setProductCategory(e.target.value)}
                    value={productCategory}
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="productStock">Product Stock</label>
                <input
                    type="number"
                    id="productStock"
                    name="countInStock"
                    onChange={(e) => setProductStock(e.target.value)}
                    value={productStock}
                />
                <label htmlFor="productRating">Product Rating</label>
                <input
                    type="number"
                    id="productRating"
                    name="rating"
                    onChange={(e) => setProductRating(e.target.value)}
                    value={productRating}
                />
                <label htmlFor="productReviewsNum">Number of Reviews</label>
                <input
                    type="number"
                    id="productReviewsNum"
                    name="numReviews"
                    onChange={(e) => setProductReviewNums(e.target.value)}
                    value={productReviewsNum}
                />
                <label htmlFor="productFeatured">Register as featured product?</label>
                <input
                    type="checkbox"
                    id="productFeatured"
                    name="isFeatured"
                    onChange={(e) => setProductFeatured(e.target.checked)}
                    checked={productFeatured}
                />
                <input type="submit" value="Submit" />
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default RegisterProduct;
