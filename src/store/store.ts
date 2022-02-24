import { configureStore } from '@reduxjs/toolkit';
import auth from './reducerAuth';
import shopList from './reducerProducts';
import checkout from './reducerCheckout';
import customers from './reducerCustomers';

const store = configureStore({
  reducer: {
    shopList: shopList.reducer,
    auth: auth.reducer,
    checkout: checkout.reducer,
    customers: customers.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const getShopList = (state: RootState) => state.shopList.shopList;
export const getShopCartList = (state: RootState) => state.auth.shopCartList;
export const getUserAuthState = (state: RootState) => state.auth.loggingState;
export const getUserRole = (state: RootState) => state.auth.userRole;
export const getShopCartTotalItems = (state: RootState) => {
  let sum = 0;
  state.auth.shopCartList.forEach((item: { quantity: number }) => {
    sum += item.quantity;
  });

  return sum;
};
export const getShopCartTotalPrice = (state: RootState) => {
  let totalPrice = 0;
  for (let i = 0; i < state.auth.shopCartList.length; i++) {
    totalPrice +=
      state.auth.shopCartList[i].price * state.auth.shopCartList[i].quantity;
  }

  return totalPrice;
};
export const getCustomerAdress = (state: RootState) => state.checkout.address;
export const getAddressObject = (state: RootState) => state.checkout.address;
export const getPaymentDetailObject = (state: RootState) =>
  state.checkout.paymentDetails;
export const getCurrentSessionNbOrders = (state: RootState) =>
  state.checkout.currentSessionOrders;
export const getCustomersList = (state: RootState) => state.customers.customers;

export default store;
