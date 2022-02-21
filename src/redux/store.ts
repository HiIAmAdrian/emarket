import { configureStore } from '@reduxjs/toolkit';
import shopList from './reducerProducts';
import auth from './reducerAuth';

const store = configureStore({
  reducer: {
    shopList: shopList.reducer,
    auth: auth.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const getShopList = (state: RootState) => state.shopList.shopList;
export const getShopCartList = (state: RootState) => state.auth.shopCartList;
export const getUserAuthState = (state: RootState) => state.auth.loginState;
export default store;
