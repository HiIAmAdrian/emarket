import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import Products from './pages/Products';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from './store/reducerProducts';
import { getUserAuthState, getUserRole } from './store/store';
import { ADMIN, LOGGED_IN } from './constants';
import { login } from './store/reducerAuth';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useUpdateEffect } from 'react-use';
import Checkout from './pages/Checkout';
import AdminPage from './pages/admin page/AdminPage';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const dispatch = useDispatch();
  const userRole = useSelector(getUserRole);
  const authState = useSelector(getUserAuthState);
  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useUpdateEffect(() => {
    setOpen(true);
  }, [authState]);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  //initial state la reducer
  useEffect(() => {
    if (localStorage.getItem('userToken'))
      dispatch(
        login({
          //specific func
          token: JSON.parse(localStorage.getItem('userToken') as string),
        })
      );
  }, []);

  return (
    <React.Fragment>
      <BrowserRouter>
        <CssBaseline enableColorScheme />
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {authState === LOGGED_IN ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            Login was successful!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            You logged out!
          </Alert>
        )}
      </Snackbar>
    </React.Fragment>
  );
}

export default App;
