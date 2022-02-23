import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ADMIN } from './constants';
import AdminPage from './pages/AdminPage/AdminPage';
import Checkout from './pages/CheckoutPage/Checkout';
import LogIn from './pages/LoginPage/LogIn';
import Products from './pages/ProductsPage/Products';
import SignUp from './pages/SignupPage/SignUp';
import { getUserRole } from './store/store';

function RoutesApp() {
  const userRole = useSelector(getUserRole);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/admin/*"
          element={
            userRole === ADMIN ? <AdminPage /> : <Navigate to="/products" />
          }
        />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
