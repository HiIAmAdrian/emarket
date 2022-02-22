import { configureStore } from '@reduxjs/toolkit';
import shopList from './reducerProducts';
import auth from './reducerAuth';
import { RootState } from '../types';

const store = configureStore({
  reducer: {
    shopList: shopList.reducer,
    auth: auth.reducer,
  },
});

export const getShopList = (state: RootState) => state.shopList.shopList;
export const getShopCartList = (state: RootState) => state.auth.shopCartList;
export const getUserAuthState = (state: RootState) => state.auth.loginState;
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

export default store;
