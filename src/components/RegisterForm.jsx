import React, { useState } from 'react';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        phone: '',
        email: '',
        dob: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="card">
            <div className="card-header text-center">
                <span className="display-4">ĐĂNG KÝ TÀI KHOẢN</span>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="fullName">Họ và tên:</label>
                        <input type="text" className="form-control" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập:</label>
                        <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu:</label>
                        <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại:</label>
                        <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Ngày tháng năm sinh:</label>
                        <input type="date" className="form-control" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Địa chỉ:</label>
                        <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary btn-block">Đăng ký</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
