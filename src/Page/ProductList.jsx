import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from '../components/ProductItem';

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    
    const [loading, setLoading] = useState(false);
    const [loaisanPhams, setLoaiSanPhams] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:9998/api/san-pham/category')
            .then((response) => {
                setLoaiSanPhams(response.data.data.loaisanPham || []);
                setLoading(false);
            })
            .catch((error) => {
                setError('Có lỗi xảy ra khi lấy dữ liệu danh mục.');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:9998/api/san-pham/laptop');
                const products = response.data.data.sanphams || [];
                setProductList(products);
            } catch (error) {
                setError('Có lỗi xảy ra khi lấy dữ liệu sản phẩm.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const filtered =
            currentCategory === 'all'
                ? productList
                : productList.filter((product) => product.category === currentCategory);
        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [currentCategory, productList]);

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

    const handleCategoryChange = (category) => {
        const selectedCategory = loaisanPhams.find((cat) => cat.maLoaiSanPham === category)?.tenLoaiSanPham || 'Danh mục không xác định';
        alert(`Bạn đã chọn: ${selectedCategory}`);
        setCurrentCategory(category);
    };

    return (
        <div className="row">
            <div className="col-md-3 d-none d-sm-block" id="aside">
                <h4>Danh mục sản phẩm</h4>
                <div className="list-group">
                    {[{ maLoaiSanPham: 'all', tenLoaiSanPham: 'Tất cả sản phẩm' }, ...loaisanPhams].map((category) => (
                        <button
                            key={category.maLoaiSanPham}
                            className={`list-group-item list-group-item-action ${currentCategory === category.maLoaiSanPham ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(category.maLoaiSanPham)}
                        >
                            {category.tenLoaiSanPham}
                        </button>
                    ))}
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
