import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
const buttonStyle = (isDisabled, isActive) => ({
    padding: '8px 16px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: isDisabled
        ? '#ccc'
        : isActive
            ? '#0056b3'
            : '#007bff',
    color: isDisabled ? '#666' : '#fff',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
});

const BrandTable = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Mỗi trang hiển thị 10 mục

    // Fetch danh sách thương hiệu
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get("http://localhost:9998/api/admin/sanpham/thuonghieu");
                setBrands(response.data.data); // Cập nhật danh sách thương hiệu
            } catch (error) {
                console.error("Error fetching brands:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    // Tính toán tổng số trang
    const totalPages = Math.ceil(brands.length / itemsPerPage);

    // Xử lý phân trang
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Lấy các mục trên trang hiện tại
    const paginatedBrands = brands.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Mở modal để chỉnh sửa thương hiệu
    const openUpdateModal = (brand) => {
        setSelectedBrand(brand); // Đặt thương hiệu được chọn
        setShowModal(true); // Hiển thị modal
    };

    // Đóng modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedBrand(null);
    };

    // Xử lý cập nhật thương hiệu
    const handleUpdateBrand = async () => {
        try {
            const response = await axios.put(
                `http://localhost:9998/api/admin/sanpham/thuonghieu/capnhat/${selectedBrand.id}`,
                selectedBrand
            );
            if (response.data.success) {
                alert("Cập nhật thương hiệu thành công!");
                // Cập nhật lại danh sách thương hiệu
                setBrands((prevBrands) =>
                    prevBrands.map((brand) =>
                        brand.id === selectedBrand.id ? selectedBrand : brand
                    )
                );
                closeModal();
            } else {
                alert("Cập nhật thương hiệu thất bại!");
            }
        } catch (error) {
            console.error("Error updating brand:", error);
            alert("Cập nhật thương hiệu thất bại!");
        }
    };

    // Xử lý xóa thương hiệu
    const handleDeleteBrand = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
            try {
                const response = await axios.delete(
                    `http://localhost:9998/api/admin/sanpham/thuonghieu/xoa/${id}`
                );
                if (response.data.status === "success") {
                    alert("Xóa thương hiệu thành công!");
                    // Cập nhật lại danh sách thương hiệu sau khi xóa
                    setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== id));
                } else {
                    alert("Xóa thương hiệu thất bại!");
                }
            } catch (error) {
                console.error("Error deleting brand:", error);
                alert("Xóa thương hiệu thất bại!");
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>Danh Sách Thương Hiệu</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã Thương Hiệu</th>
                        <th>Tên Thương Hiệu</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedBrands.map((brand, index) => (
                        <tr key={brand.id}>
                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td>{brand.maThuongHieu}</td>
                            <td>{brand.tenThuongHieu}</td>
                            <td>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        style={{ width: '70px', height: '40px' }}
                                        onClick={() => openUpdateModal(brand)}
                                    >
                                        Cập nhật
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        style={{ width: '70px', height: '40px' }}
                                        onClick={() => handleDeleteBrand(brand.id)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Hiển thị phân trang với nút tùy chỉnh */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={buttonStyle(currentPage === 1, false)}
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        style={buttonStyle(false, currentPage === index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={buttonStyle(currentPage === totalPages, false)}
                >
                    Next
                </button>
            </div>

            {/* Modal Cập nhật */}
            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật Thương Hiệu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formMaThuongHieu">
                            <Form.Label>Mã Thương Hiệu</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedBrand?.maThuongHieu}
                                onChange={(e) =>
                                    setSelectedBrand({
                                        ...selectedBrand,
                                        maThuongHieu: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formTenThuongHieu">
                            <Form.Label>Tên Thương Hiệu</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedBrand?.tenThuongHieu}
                                onChange={(e) =>
                                    setSelectedBrand({
                                        ...selectedBrand,
                                        tenThuongHieu: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleUpdateBrand}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BrandTable;
