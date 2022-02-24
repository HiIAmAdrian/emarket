import React, { useEffect } from 'react';
import LoginSnackbar from './common/components/LoginSnackbar';
import { useDispatch } from 'react-redux';
import { getItems } from './store/reducerProducts';

import RoutesApp from './Routes';

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
