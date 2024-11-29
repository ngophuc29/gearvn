import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch danh sách người dùng từ API
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('There was an error fetching users!', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container-fluid" style={{ marginTop: 100 }}>
            <h2>Danh Sách Người Dùng</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ Tên</th>
                        <th>Tên Đăng Nhập</th>
                        <th>Email</th>
                        <th>Quyền</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/admin/edit-user/${user.id}`} className="btn btn-warning">Chỉnh Sửa</Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:4000/api/users/${id}`);
        alert('Người dùng đã bị xóa!');
        window.location.reload(); // Tải lại trang sau khi xóa thành công
    } catch (error) {
        console.error('There was an error deleting the user!', error);
    }
};

export default UserTable;
