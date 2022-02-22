import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CheckoutSliceState } from '../types';

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    address: [''],
    paymentDetails: {
      cardHolder: '',
      cardNumber: '',
      cardType: '',
      expiryDate: '',
    },
  } as CheckoutSliceState,
  reducers: {},
});
