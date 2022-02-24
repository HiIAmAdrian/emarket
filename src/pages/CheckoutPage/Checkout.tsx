import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emptyShoppingCart } from '../../store/reducerAuth';
import { processOrder } from '../../store/reducerCheckout';
import {
  getAddressObject,
  getPaymentDetailObject,
  getShopCartList,
  getShopCartTotalPrice,
} from '../../store/store';
import { Order } from '../../types';
import AddressForm from './components/AddressForm';
import PaymentForm from './components/PaymentForm';
import Review from './components/Review';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const shopCart = useSelector(getShopCartList);
  const paymentDetails = useSelector(getPaymentDetailObject);
  const shippingAddress = useSelector(getAddressObject);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const total = useSelector(getShopCartTotalPrice);
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

  function handlePlaceOrder() {
    const order: Order = {
      shippingAddress,
      paymentDetails,
      shopCart,
      total,
    };
    dispatch(processOrder(order));
    navigate('/orderplaced');
    dispatch(emptyShoppingCart());
  }

  const handleNext = () => {
    let stop = 0;
    if (!activeStep) {
      stop = Object.values(shippingAddress).includes('') ? 1 : 0;
    } else if (activeStep == 1) {
      stop = Object.values(paymentDetails).includes('') ? 1 : 0;
    }
    if (!stop) {
      setActiveStep(activeStep + 1);
    } else {
      setOpen(true);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            A regular Shop
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mb: 4 }} maxWidth="md">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handlePlaceOrder}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {'Place Order'}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {'Next'}
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Complete all fields!
          </Alert>
        </Snackbar>
      </Container>
    </React.Fragment>
  );
}
