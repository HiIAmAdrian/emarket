import { createSlice } from '@reduxjs/toolkit';

interface CheckoutSliceState {
  address: string[];
  paymentDetails: {
    cardCVV: string;
    cardHolder: string;
    cardNumber: string;
    expiryDate: string;
  };
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    address: [''],
    paymentDetails: {
      cardHolder: '',
      cardNumber: '',
      cardCVV: '',
      expiryDate: '',
    },
  } as CheckoutSliceState,
  reducers: {},
});
