import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        role: ''
    });

    useEffect(() => {
        // Fetch danh sách người dùng từ API
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:9998/api/home/user/all');
                // Lọc người dùng có vai trò không phải là "ADMIN"
                const filteredUsers = response.data.filter(user => user.role !== 'ADMIN');
                setUsers(filteredUsers);
            } catch (error) {
                console.error('There was an error fetching users!', error);
            }
        };

        fetchUsers();
    }, []);

    const handleShowModal = (user) => {
        setCurrentUser(user);
        setFormData(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentUser(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (!formData.username) {
            alert('Username is required');
            return;
        }
        console.log("username :",formData.username)
        try {
            await axios.put(`http://localhost:9998/api/home/user/${formData.id}`, formData);

            setUsers(users.map(user => (user.id === formData.id ? formData : user)));
            handleCloseModal();
        } catch (error) {
            console.error('There was an error updating the user!', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9998/api/home/user/${id}`);
            alert('Người dùng đã bị xóa!');
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('There was an error deleting the user!', error);
        }
    };

    return (
        <div className="container-fluid" style={{ marginTop: 100 }}>
            <h2>Danh Sách Người Dùng</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Reference ID</th>
                        <th>Họ</th>
                        <th>Tên</th>
                        <th>Tên Đăng Nhập</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Quyền</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.id}</td>
                            <td>{user.referenceId}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleShowModal(user)}>Chỉnh Sửa</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateUser}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                
                                type="text"
                                name="username"
                                value={formData.username || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                value={formData.role || ''}
                                onChange={handleChange}
                            >
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserTable;