import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryAside = () => {
    const [loading, setLoading] = useState(false);
    const [loaisanPhams, setLoaiSanPhams] = useState([]);
    const [error, setError] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null); // Add currentCategory state

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

    const handleCategoryChange = (categoryId) => {
        setCurrentCategory(categoryId); // Update the current category when clicked
        // You can also perform any other action you want when a category is selected
    };

    return (
        <aside className="category-aside">
            <h4>Danh mục sản phẩm</h4>
            <div className="list-group">
                {loading ? (
                    <div>Loading...</div> // Show loading text while fetching data
                ) : error ? (
                    <div>{error}</div> // Show error message if there's an error
                ) : (
                    loaisanPhams.map((category) => (
                        <button
                            key={category.maLoaiSanPham}
                            className={`list-group-item list-group-item-action ${currentCategory === category.maLoaiSanPham ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(category.maLoaiSanPham)}
                        >
                            {category.tenLoaiSanPham}
                        </button>
                    ))
                )}
            </div>
        </aside>
    );
};

export default CategoryAside;
