import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartComponent = () => {
    const navigate=useNavigate()
    const [cartItems, setCartItems] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    // Load cart and user data from localStorage
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const user = localStorage.getItem("currentUser");
        setCartItems(cart);
        setCurrentUser(user);
    }, []);

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
        localStorage.removeItem("cart"); // Xóa giỏ hàng
        setCartItems([]); // Reset giao diện
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
                                    <p>{item.name} - {item.quantity} x {item.price}₫</p>
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
                            {cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toLocaleString()}₫
                        </p>
                    </div>
                    <button
                        id="checkout-btn"
                        className="btn btn-success mt-3"
                        onClick={handleCheckout}
                    >
                        Thanh toán
                    </button>
                    <div className="btn btn-primary mt-3"
                    onClick={()=>navigate("/product")}
                    >
                        Tiếp tục mua hàng
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartComponent;
