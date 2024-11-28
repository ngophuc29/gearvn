import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const CategoryAside = () => {
    const [loading, setLoading] = useState(false);
    const [thuongHieus, setThuongHieus] = useState([]);
    const [error, setError] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

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

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const thuonghieu = query.get('thuonghieu') || 'all';
        setCurrentCategory(thuonghieu);
    }, [location]);

    const handleCategoryChange = (categoryId) => {
        console.log("Selected Category ID:", categoryId); // Log giá trị categoryId
        setCurrentCategory(categoryId);
        navigate(`/product?thuonghieu=${categoryId}`);
    };

    return (
        <aside className="category-aside">
            <h4>Danh mục Hãng</h4>
            <div className="list-group">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    thuongHieus.map((thuongHieu) => (
                        <button
                            key={thuongHieu.maThuongHieu}
                            className={`list-group-item list-group-item-action ${currentCategory === thuongHieu.maThuongHieu ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(thuongHieu.maThuongHieu)}
                        >
                            {thuongHieu.tenThuongHieu}
                        </button>
                    ))
                )}
            </div>
        </aside>
    );
};

export default CategoryAside;