import React, { useEffect } from 'react';
import { CssBaseline, Grid } from '@mui/material';
import ShopList from './components/product page/ShopList.tsx';
import Header from './components/header/Header';
import LogIn from './components/user handle pages/LogIn';
import SignUp from './components/user handle pages/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getItems } from './redux/reducerProducts';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <CssBaseline enableColorScheme />
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Header />
        </Grid>
        <Grid item container>
          <Routes>
            <Route
              exact
              path="/products"
              element={
                <React.Fragment>
                  <Grid item xs={2} sm={2} md={1} xl={1} />
                  <Grid item xs={10} sm={8} md={10} xl={10}>
                    <ShopList />
                  </Grid>
                  <Grid item xs={false} sm={2} md={1} xl={1} />
                </React.Fragment>
              }
            />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
