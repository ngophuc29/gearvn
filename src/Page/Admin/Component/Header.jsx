import React from "react";

const Header = () => {
    return (
        <header className="main-header" style={{display:'flex',justifyContent:'space-between',padding:'10px 10px'}}>
            {/* Logo */}
            <div className="logo-container">
                <a href="/admin" className="logo">
                    
                    <img src="https://file.hstatic.net/200000636033/file/logo_fd11946b31524fbe98765f34f3de0628.svg" alt="logo" style={{ width: "200px", marginLeft: 20 }} />

                </a>
            </div>

            {/* Header Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/* Sidebar toggle button */}
                <button
                    className="sidebar-toggle navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar links and actions */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {/* Messages */}
                        <li className="nav-item dropdown">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle"
                                id="navbarMessages"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fa fa-envelope-o"></i>
                                <span className="badge badge-success">4</span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarMessages">
                                <h6 className="dropdown-header">You have 4 messages</h6>
                                <div className="dropdown-item">
                                    <div className="d-flex">
                                        <img
                                            src="../../../assets/images/user2-160x160.jpg"
                                            className="img-circle mr-2"
                                            alt="User"
                                        />
                                        <div>
                                            <h5 className="mb-0">Support Team</h5>
                                            <small>5 mins ago</small>
                                            <p className="mb-0">Why not buy a new awesome theme?</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown-footer text-center">
                                    <a href="#">See All Messages</a>
                                </div>
                            </div>
                        </li>

                        {/* Notifications */}
                        <li className="nav-item dropdown">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle"
                                id="navbarNotifications"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fa fa-bell-o"></i>
                                <span className="badge badge-warning">10</span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarNotifications">
                                <h6 className="dropdown-header">You have 10 notifications</h6>
                                <div className="dropdown-item">
                                    <i className="fa fa-users text-aqua"></i> 5 new members joined today
                                </div>
                                <div className="dropdown-footer text-center">
                                    <a href="#">View all</a>
                                </div>
                            </div>
                        </li>

                        {/* Tasks */}
                        <li className="nav-item dropdown">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle"
                                id="navbarTasks"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fa fa-flag-o"></i>
                                <span className="badge badge-danger">9</span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarTasks">
                                <h6 className="dropdown-header">You have 9 tasks</h6>
                                <div className="dropdown-item">
                                    <h6>
                                        Design some buttons <small className="float-right">20%</small>
                                    </h6>
                                    <div className="progress">
                                        <div
                                            className="progress-bar progress-bar-aqua"
                                            style={{ width: "20%" }}
                                            role="progressbar"
                                            aria-valuenow="20"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                </div>
                                <div className="dropdown-footer text-center">
                                    <a href="#">View all tasks</a>
                                </div>
                            </div>
                        </li>

                        {/* User Account */}
                        <li className="nav-item dropdown">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle"
                                id="navbarUser"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <img
                                    src="../../../assets/images/avatar2.png"
                                    className="user-image"
                                    alt="User"
                                />
                                <span className="d-none d-lg-inline">Alexander Pierce</span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarUser">
                                <div className="user-header">
                                    <img
                                        src="../../../assets/images/user2-160x160.jpg"
                                        className="img-circle"
                                        alt="User"
                                    />
                                    <p>
                                        Alexander Pierce - Web Developer <small>Member since Nov. 2012</small>
                                    </p>
                                </div>
                                <div className="user-body">
                                    <div className="row text-center">
                                        <div className="col-4">
                                            <a href="#">Followers</a>
                                        </div>
                                        <div className="col-4">
                                            <a href="#">Sales</a>
                                        </div>
                                        <div className="col-4">
                                            <a href="#">Friends</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-footer">
                                    <a href="#" className="btn btn-default btn-flat">Profile</a>
                                    <a href="/admin-logout" className="btn btn-default btn-flat">Sign out</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
