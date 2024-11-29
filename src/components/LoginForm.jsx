import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        // Kiểm tra thông tin nhập
        if (!username || !password) {
            alert("Vui lòng nhập đầy đủ thông tin đăng nhập!");
            return;
        }

        try {
            // Gửi yêu cầu đăng nhập đến backend
            const response = await axios.post("http://localhost:9998/login", {
                username,
                password,
            });

            // Kiểm tra phản hồi từ backend
            if (response.data.authenticated) {
                alert("Đăng nhập thành công!");
                const token = response.data.token;
                localStorage.setItem("token", token); // Lưu token
                localStorage.setItem("currentUser", JSON.stringify({ username })); // Lưu thông tin người dùng
                navigate("/"); // Chuyển hướng về trang chủ
            } else {
                alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
            }
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
            alert("Đăng nhập không thành công. Vui lòng thử lại!");
        }
    };

    return (
        <div className="card">
            <span className="card-header display-4 text-center">ĐĂNG NHẬP</span>
            <div className="card-body">
                <form id="loginForm" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="loginUsername">Tên đăng nhập:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="loginUsername"
                            name="loginUsername"
                            required
                            placeholder="Nhập tên đăng nhập..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="loginPassword">Mật khẩu:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="loginPassword"
                            name="loginPassword"
                            required
                            placeholder="Nhập mật khẩu..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /> </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Đăng nhập
                    </button>
                </form>
            </div>
            <div className="card-footer">
                <div className="text-center">
                    Bạn chưa có tài khoản?{" "}
                    <a href="#" className="text-danger" onClick={() => navigate("/signup")}>
                        Đăng kí tài khoản ngay
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;