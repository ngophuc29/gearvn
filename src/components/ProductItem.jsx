import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ product }) => {
    const navigate=useNavigate()
    // Kiểm tra xem sản phẩm có giảm giá không
    const hasDiscount = product.chiTietNhapHangs[0]?.phanTramLoiNhuan > 0;
    const formattedPrice = typeof product.chiTietNhapHangs[0]?.donGiaNhap === 'number'
        ? product.chiTietNhapHangs[0].donGiaNhap.toLocaleString('vi-VN') + '₫'
        : 'Liên hệ';

    // Hình ảnh sản phẩm
    const imageUrl = product.hinhAnh.url;

    return (
        <div className="col-md-4 col-lg-3 col-6 my-1 px-1" onClick={() => {
            navigate(`/product-detail/${product.lapTop.maLapTop}`, { state: { product } });


        }}>
            <div className="product-card">
                <img
                    src={imageUrl}
                    alt={product.tenSanPham}
                    className="product-image img-fluid"
                />
                <div className="product-content d-flex flex-column">
                    <div className="product-title">{product.tenSanPham}</div>
                    <div className="product-description">
                        {product.lapTop.manHinh}, {product.lapTop.ram}GB RAM
                    </div>
                    <div className="product-price-container">
                        {hasDiscount && <div className="product-discount">{formattedPrice}</div>}
                        <div className="product-price">{formattedPrice}</div>
                    </div>
                </div>
                {hasDiscount && (
                    <div className="btn-discount">-{(product.chiTietNhapHangs[0]?.phanTramLoiNhuan || 0)}%</div>
                )}
            </div>
        </div>
    );
};


export default ProductItem;
