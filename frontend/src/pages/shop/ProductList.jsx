import { useState, useEffect } from "react";
import { ProductItem } from "./ProductItem";
import "./css/productList.css";

export const ProductList = (props) => {
    const [products, setAllProducts] = useState([]); // 현재까지 로드된 제품들
    const [totalCount, setTotalCount] = useState(0); // 전체 제품 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [loading, setLoading] = useState(false); // 로딩 상태

    const limit = 8;

    const fetchProducts = async (page) => {
        setLoading(true); // 로딩 시작
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/products?page=${page}&limit=${limit}`);

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();

            // 새로운 제품을 기존 제품 리스트에 추가
            setAllProducts((prevProducts) => [...prevProducts, ...data.products]);
            setTotalCount(data.totalCount);

        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false); // 로딩 끝
        }
    };

    useEffect(() => {
        fetchProducts(currentPage); // 페이지가 변경될 때마다 제품을 불러옴
    }, [currentPage]);  // currentPage가 바뀔 때마다 실행

    const totalPages = Math.ceil(totalCount / limit); // 전체 페이지 수 계산
    const progress = totalPages > 0 ? (currentPage / totalPages) * 100 : 0; // 진행 상태 계산

    return (
        <div className="product-list">
            <h1>All Products</h1>
            <div className="products-gallery">
                {products.map((product) => (
                    <ProductItem data={product} key={product._id} />
                ))}
            </div>
            <hr />
            <div className="show-result-container">
                <p>Showing {products.length} of {totalCount} results</p>
                <div className="show-result-meterbar">
                    <div
                        className="show-result-meterbar-color"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)} // "Show more" 버튼 클릭 시 페이지 증가
                    disabled={loading || currentPage >= totalPages} // 마지막 페이지에서는 버튼 비활성화
                >
                    {loading ? "Loading..." : currentPage >= totalPages ? "No more products" : "Show more"}
                </button>
            </div>
        </div>
    );
};
