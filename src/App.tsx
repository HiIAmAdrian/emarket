import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import ShopList from './components/pages/product page/ShopList';
import LogIn from './components/pages/user handle pages/LogIn';
import SignUp from './components/pages/user handle pages/SignUp';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from './redux/reducerProducts';
import Dashboard from './components/pages/admin page/Dashboard';
import { getUserAuthState, getUserRole } from './redux/store';
import { ADMIN, LOGGED_IN } from './constants';
import { login } from './redux/reducerAuth';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useUpdateEffect } from 'react-use';

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

  /*useEffect(() => {
    dispatch(getItems());
  }, [dispatch, localStorage.getItem('numberOfItems')]);*/

  useEffect(() => {
    if (localStorage.getItem('userToken'))
      dispatch(
        login({
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
