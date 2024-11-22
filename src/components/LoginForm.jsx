import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const navigate= useNavigate()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // Kiểm tra xem username và password có được nhập không
        if (!username || !password) {
            alert("Vui lòng nhập đầy đủ thông tin đăng nhập!");
            return;
        }

        // Xử lý đăng nhập
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = storedUsers.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
            alert("Đăng nhập thành công!");
            localStorage.setItem("currentUser", JSON.stringify(user)); // Lưu thông tin user hiện tại
            window.location.href = "/"; // Chuyển hướng về trang chủ hoặc trang mong muốn
        } else {
            alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
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
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Đăng nhập
                        </button>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="text-center">
                        Bạn chưa có tài khoản?{" "}
                        <a href="" className="text-danger" onClick={()=>navigate("/signup")}>
                            Đăng kí tài khoản ngay
                        </a>
                    </div>
                </div>
            </div>
        
    );
};

export default LoginForm;
