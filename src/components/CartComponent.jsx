import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartComponent = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    // Load cart and user data from localStorage
    useEffect(() => {
        const user = localStorage.getItem("currentUser");
        setCurrentUser(user);

        // Lấy giỏ hàng từ API
        if (user) {
            axios.get("http://localhost:9998/api/cart", {
                headers: {
                    Authorization: `Bearer ${user.token}` // Nếu bạn có token người dùng
                }
            })
                .then((response) => {
                    setCartItems(response.data.data.chiTietGioHangs); // Giả sử cấu trúc trả về có trường `chiTietGioHangs`
                })
                .catch((error) => {
                    console.error("Lỗi khi tải giỏ hàng", error);
                    alert("Không thể tải giỏ hàng!");
                });
        }
    }, [currentUser]);

    const handleCheckout = () => {
        if (!currentUser) {
            alert("Vui lòng đăng nhập để thanh toán!");
            return;
        }

        if (cartItems.length === 0) {
            alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm để thanh toán!");
            return;
        }

        // Thanh toán thành công
        alert("Thanh toán thành công!");
        setCartItems([]); // Reset giao diện giỏ hàng
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3" id="aside">
                    <span className="display-4">GIỎ HÀNG</span>
                    <div id="cart-items-container">
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <div key={index}>
                                    <p>
                                        <img
                                            src={item.sanPham.hinhAnh.url}
                                            alt={item.sanPham.tenSanPham}
                                            style={{ width: "50px", height: "auto" }}
                                        />
                                        <strong>{item.sanPham.tenSanPham}</strong> - {item.soLuong} x{" "}
                                        {item.sanPham.lapTop.cpu} - {item.discount.toLocaleString()}₫
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>Giỏ hàng của bạn đang trống.</p>
                        )}
                    </div>
                </div>
                <div className="col-9" id="section">
                    <span className="display-4">TOTAL</span>
                    <div id="bill-table">
                        <p>
                            Tổng tiền:{" "}
                            {cartItems.reduce(
                                (total, item) => total + item.soLuong * (item.discount || 0),
                                0
                            ).toLocaleString()}₫
                        </p>
                    </div>
                    <button
                        id="checkout-btn"
                        className="btn btn-success mt-3"
                        onClick={handleCheckout}
                    >
                        Thanh toán
                    </button>
                    <div
                        className="btn btn-primary mt-3"
                        onClick={() => navigate("/product")}
                    >
                        Tiếp tục mua hàng
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartComponent;
