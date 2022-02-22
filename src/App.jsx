import React, { useEffect } from 'react';
import { CssBaseline, Grid } from '@mui/material';
import ShopList from './components/pages/product page/ShopList.tsx';
import Header from './components/header/Header';
import LogIn from './components/pages/user handle pages/LogIn';
import SignUp from './components/pages/user handle pages/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getItems } from './redux/reducerProducts';
import Dashboard from './components/pages/admin page/Dashboard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <CssBaseline enableColorScheme />
      <Routes>
        <Route exact path="/products" element={<ShopList />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
