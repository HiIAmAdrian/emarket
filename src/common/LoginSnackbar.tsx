import * as React from 'react';
import { getUserAuthState } from '../store/store';
import { LOGGED, NOT_LOGGED } from '../constants';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useUpdateEffect } from 'react-use';
import { useSelector } from 'react-redux';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginSnackbar() {
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

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      {authState === LOGGED ? (
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Login was successful!
        </Alert>
      ) : authState === NOT_LOGGED ? (
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          You logged out!
        </Alert>
      ) : (
        <div></div>
      )}
    </Snackbar>
  );
}

export default LoginSnackbar;
