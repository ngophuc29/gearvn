import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderTable = () => {
    const [orders, setOrders] = useState([]); // Dữ liệu đơn hàng
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const itemsPerPage = 7; // Số lượng đơn hàng trên mỗi trang

    // Gọi API lấy dữ liệu đơn hàng
    useEffect(() => {
        axios
            .get("http://localhost:9998/api/orders")
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    // Tính toán dữ liệu phân trang
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const currentItems = orders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Xử lý khi chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container  " style={{ marginTop: 90 }}>
            <h1 className="text-center mb-4">Danh sách đơn hàng</h1>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Order ID</th>
                        <th>Receiver Name</th>
                        <th>Receiver Phone</th>
                        <th>Receiver Address</th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Shipping Fee</th>
                        <th>Final Total Price</th>
                        <th>Payment Method</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.receiverName}</td>
                            <td>{order.receiverPhone}</td>
                            <td>{order.receiverAddress}</td>
                            <td>
                                <ul>
                                    {order.sanPhams.map((product) => (
                                        <div key={product.maSanPham}>
                                            {product.tenSanPham} - {product.loaiSanPham.tenLoaiSanPham} ({product.thuongHieu.tenThuongHieu})
                                        </div>
                                    ))}
                                </ul>
                            </td>
                            <td>{order.quantity.toLocaleString()}   </td>
                            <td>{order.totalPrice.toLocaleString()} VND</td>
                            <td>{order.shippingFee.toLocaleString()} VND</td>
                            <td>{order.finalTotalPrice.toLocaleString()} VND</td>
                            <td>{order.paymentMethod.toUpperCase()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Phân trang */}
            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index + 1}
                            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default OrderTable;
