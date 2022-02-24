import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ADMIN } from './common/variables/constants';
import AdminPage from './pages/Admin';
import Checkout from './pages/Checkout';
import OrderPlaced from './pages/Checkout/OrderPlaced';
import LogIn from './pages/Login';
import Products from './pages/Products';
import SignUp from './pages/Signup/SignUp';
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
        <Route path="/orderplaced" element={<OrderPlaced />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
