import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Order,
  PaymentDetails,
  ShippingAddress,
} from '../common/variables/types';
import { setOrder } from '../common/services/storageHandler';

interface CheckoutSliceState {
  address: ShippingAddress;
  paymentDetails: PaymentDetails;
  currentSessionOrders: number;
}

interface SetDetail {
  field: string;
  detail: string;
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    address: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
    paymentDetails: {
      cardHolder: '',
      cardNumber: '',
      cardCVV: '',
      expiryDate: '',
    },
    currentSessionOrders: 0,
  } as CheckoutSliceState,
  reducers: {
    setAdressDetail(state, action: PayloadAction<SetDetail>) {
      state.address[action.payload.field as keyof ShippingAddress] =
        action.payload.detail;
    },
    setPaymentDetail(state, action: PayloadAction<SetDetail>) {
      state.paymentDetails[action.payload.field as keyof PaymentDetails] =
        action.payload.detail;
    },
    processOrder(state, action: PayloadAction<Order>) {
      setOrder(action.payload);
      state.currentSessionOrders = state.currentSessionOrders + 1;
      state = {
        ...state,
        address: {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          country: '',
        },
        paymentDetails: {
          cardHolder: '',
          cardNumber: '',
          cardCVV: '',
          expiryDate: '',
        },
      };
    },
  },
});

export const { setAdressDetail, setPaymentDetail, processOrder } =
  checkoutSlice.actions;

export default checkoutSlice;
