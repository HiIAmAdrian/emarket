import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import ShopList from './components/pages/product page/ShopList.tsx';
import LogIn from './components/pages/user handle pages/LogIn';
import SignUp from './components/pages/user handle pages/SignUp';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from './redux/reducerProducts';
import Dashboard from './components/pages/admin page/Dashboard';
import { getUserRole } from './redux/store';
import { ADMIN } from './constants';

function App() {
  const dispatch = useDispatch();
  const userRole = useSelector(getUserRole);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch, localStorage.getItem('numberOfItems')]);

  return (
    <BrowserRouter>
      <CssBaseline enableColorScheme />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ShopList />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard/*"
          element={
            userRole === ADMIN ? <Dashboard /> : <Navigate to="/products" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
