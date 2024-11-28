import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import các thành phần
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Page/Home";
import SignUp from "./Page/SignUp";
import ProductList from "./Page/ProductList";
import ProductDetails from "./components/ProductDetail";
import Cart from "./Page/Cart";
import Login from "./Page/Login";
import LoginAdmin from "./Page/Admin/LoginAdmin";
import HeaderAdmin from "./Page/Admin/Component/Header";
import HomeAdmin from "./Page/Admin/HomeAdmin";  // Đảm bảo rằng HomeAdmin đã được import
import SidebarAdmin from '../src/Page/Admin/Component/SidebarAdmin'
import ProductTable from "../src/Page/Admin/Component/ProductTable";
import LoaiSanPhamTable from "./Page/Admin/Component/LoaiSanPhamTable";
import AddProductForm from "./Page/Admin/Component/AddProductForm";
import SupplierTable from "./Page/Admin/Component/SupplierTable";
import AddSupplier from "./Page/Admin/Component/AddSupplierForm";
import BrandTable from "./Page/Admin/Component/BrandTable";
import AddBrandForm from "./Page/Admin/Component/AddBrandForm";
import ReceiverInfoPage from "./Page/ReceiverInfoPage";
import OrderTable from "./Page/Admin/Component/OrderTable";
import OrderStatistics from "./Page/Admin/Component/OrderStatistics";
import WebsiteStatistics from "./Page/Admin/Component/WebsiteStatistics";
// Layouts
function UserLayout({ children }) {
  return (
    <>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </>
  );
}

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {children} {/* Không có Header và Footer ở đây */}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Tuyến đường dành cho người dùng */}
          <Route
            path="/"
            element={
              <UserLayout>
                <Home />
              </UserLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <UserLayout>
                <SignUp />
              </UserLayout>
            }
          />
          <Route
            path="/login"
            element={
              <UserLayout>
                <Login />
              </UserLayout>
            }
          />
          <Route
            path="/product"
            element={
              <UserLayout>
                <ProductList />
              </UserLayout>
            }
          />
          <Route
            path="/product-detail/:id"
            element={
              <UserLayout>
                <ProductDetails />
              </UserLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <UserLayout>
                <Cart />
              </UserLayout>
            }
          />

          
          <Route
            path="/receiver-info"
            element={
              <UserLayout>
                <ReceiverInfoPage />
              </UserLayout>
            }
          />
          
          

          {/* Tuyến đường dành cho quản trị */}
          <Route
            path="/admin/login"
            element={
              <AdminLayout>
                <LoginAdmin />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/home"
            element={
              <AdminLayout>
                <HeaderAdmin />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '20%' }}>

                    <SidebarAdmin />
                  </div>
                  <div style={{ width: '80%' }}>


                    <HomeAdmin />
                  </div>
                </div>
              </AdminLayout>
            }
          />
          <Route
            path="/admin/categoryList"
            element={
              <AdminLayout>
                <HeaderAdmin />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '17%' }}>
                    <SidebarAdmin />
                  </div>
                  <div style={{ width: '80%' }}>
                    <LoaiSanPhamTable />
                  </div>
                </div>
              </AdminLayout>
            }
          />
          <Route
            path="/admin/productList"
            element={
              <AdminLayout>
                <HeaderAdmin />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '17%' }}>

                    <SidebarAdmin />
                  </div>
                  <div style={{ width: '80%' }}>


                    <ProductTable />
                  </div>
                </div>
              </AdminLayout>
            }
          />

         
          <Route
            path="/admin/add-product"
            element={
              <AdminLayout>
                <HeaderAdmin />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '17%' }}>

                    <SidebarAdmin />
                  </div>
                  <div style={{ width: '80%' }}>


                    <AddProductForm />
                  </div>
                </div>
              </AdminLayout>
            }
          />
        
          

          {/* nha cung cap */}

          <Route
            path="/admin/supplierList"
            element={
              <AdminLayout>
                <HeaderAdmin />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '17%' }}>

                    <SidebarAdmin />
                  </div>
                  <div style={{ width: '80%' }}>


                    <SupplierTable />
                  </div>
                </div>
              </AdminLayout>
            }
          />


          <Route
            path="/admin/add-supplier"
            element={
              <AdminLayout>
                <HeaderAdmin />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '17%' }}>

                    <SidebarAdmin />
                  </div>
                  <div style={{ width: '80%' }}>


                    <AddSupplier />
                  </div>
                </div>
              </AdminLayout>
            }
          />

          {/* thương hiệu */}

          <Route
            path="/admin/brandList"
            element={
              <AdminLayout>
                <HeaderAdmin />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '17%' }}>

                    <SidebarAdmin />
                  </div>
                  <div style={{ width: '80%' }}>


                    <BrandTable />
                  </div>
                </div>
              </AdminLayout>
            }
          />


          <Route
            path="/admin/add-brand"
            element={
              <AdminLayout>
                <HeaderAdmin />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '17%' }}>

                    <SidebarAdmin />
                  </div>
                  <div style={{ width: '80%' }}>


                    <AddBrandForm />
                  </div>
                </div>
              </AdminLayout>
            }
          />

          {/* Order */}
          <Route
            path="/admin/orderList"
            element={
              <AdminLayout>
                <HeaderAdmin />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '17%' }}>

                    <SidebarAdmin />
                  </div>
                  <div style={{ width: '80%' }}>


                    <OrderTable />
                  </div>
                </div>
              </AdminLayout>
            }
          />
          <Route
            path="/admin/orderStatistics"
            element={
              <AdminLayout>
                <HeaderAdmin />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '17%' }}>

                    <SidebarAdmin />
                  </div>
                  <div style={{ width: '80%' }}>


                    <OrderStatistics />
                  </div>
                </div>
              </AdminLayout>
            }
          />

          {/* Statistics */}
          <Route
            path="/admin/statistics"
            element={
              <AdminLayout>
                <HeaderAdmin />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '17%' }}>

                    <SidebarAdmin />
                  </div>
                  <div style={{ width: '80%' }}>


                    <WebsiteStatistics />
                  </div>
                </div>
              </AdminLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
