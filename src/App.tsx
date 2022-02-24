import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LoginSnackbar from './common/components/LoginSnackbar';
import RoutesApp from './Routes';
import { getItems } from './store/reducerProducts';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <React.Fragment>
      <RoutesApp />
      <LoginSnackbar />
    </React.Fragment>
  );
}

export default App;
