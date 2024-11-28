import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductItem from '../components/ProductItem';

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [thuongHieus, setThuongHieus] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const thuonghieu = query.get('thuonghieu') || 'all';

    const [currentCategory, setCurrentCategory] = useState(thuonghieu);

    // Fetch danh sách hãng sản phẩm
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:9998/api/san-pham/thuonghieu')
            .then((response) => {
                setThuongHieus(response.data.data.thuonghieu || []);
                setLoading(false);
            })
            .catch((error) => {
                setError('Có lỗi xảy ra khi lấy dữ liệu hãng sản phẩm.');
                setLoading(false);
            });
    }, []);

    // Fetch danh sách sản phẩm
    const fetchProducts = async (category) => {
        setLoading(true);
        try {
            const url = category === 'all'
                ? 'http://localhost:9998/api/san-pham/laptop'
                : `http://localhost:9998/api/san-pham/laptop?thuonghieu=${category}`;
            const response = await axios.get(url);
            const products = response.data.data.sanphams || [];
            setProductList(products);
        } catch (error) {
            setError('Có lỗi xảy ra khi lấy dữ liệu sản phẩm.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("URL thuonghieu:", thuonghieu); // Log giá trị thuonghieu từ URL
        fetchProducts(thuonghieu);
        setCurrentCategory(thuonghieu); // Đồng bộ currentCategory với URL
    }, [thuonghieu]);

    useEffect(() => {
        setFilteredProducts(productList);
        setCurrentPage(1);
    }, [productList]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const getCurrentProducts = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({
            top: document.getElementById('productList').offsetTop,
            behavior: 'smooth',
        });
    };

    const handleCategoryChange = (categoryId) => {
        console.log("Selected Category ID in ProductList:", categoryId); // Log giá trị categoryId trong ProductList
        setCurrentCategory(categoryId);
        navigate(`/product?thuonghieu=${categoryId}`);
    };

    return (
        <div className="row" style={{ margin: "20px 20px" }}>
            <div className="col-md-3 d-none d-sm-block" id="aside">
                <div style={{ margin: "0 20px 0 0" }}>
                    <h4>Danh mục Hãng</h4>
                    <div className="list-group">
                        {[{ maThuongHieu: 'all', tenThuongHieu: 'Tất cả Hãng' }, ...thuongHieus].map((hang) => (
                            <button
                                key={hang.maThuongHieu}
                                className={`list-group-item list-group-item-action ${currentCategory === String(hang.maThuongHieu) ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(hang.maThuongHieu)}
                            >
                                {hang.tenThuongHieu}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-md-9 col-sm-12">
                <div id="productList" className="row">
                    {loading ? (
                        <div className="text-center w-100">
                            <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Đang tải sản phẩm...
                            </button>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : filteredProducts.length > 0 ? (
                        getCurrentProducts().map((product, index) => <ProductItem key={index} product={product} />)
                    ) : (
                        <p>Không có sản phẩm nào phù hợp.</p>
                    )}
                </div>

                {totalPages > 1 && !loading && (
                    <ul id="pagination" className="pagination justify-content-center">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(page)}>
                                    {page}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProductList;