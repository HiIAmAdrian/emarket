import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOGGED_IN, LOGGED_OUT, USER, ADMIN, ADMIN_NAME } from '../constants';
import {
  getUserName,
  getUserToken,
  removeUserName,
  removeUserToken,
  setUserToken,
} from '../services/storageHandle';
import { AuthSliceState, LogInAction, SetQuantity, ShopItem } from '../types';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loginState: getUserToken() ? LOGGED_IN : LOGGED_OUT,
    userRole: getUserName() === ADMIN_NAME ? ADMIN : USER,
    shopCartList: [],
  } as AuthSliceState,
  reducers: {
    logout(state) {
      state.loginState = LOGGED_OUT;
      state.shopCartList = [];
      removeUserName();
      removeUserToken();
    },
    login(state, action: PayloadAction<LogInAction>) {
      state.loginState = LOGGED_IN;
      setUserToken(action.payload.token);
      state.userRole = getUserName() === ADMIN_NAME ? ADMIN : USER;
    },
    addToShopCart(state, action: PayloadAction<ShopItem>) {
      const newItem = { ...action.payload, quantity: 1 };
      if (state.shopCartList.find((item) => item.id === action.payload.id)) {
        state.shopCartList = state.shopCartList.map((item) =>
          item.id !== action.payload.id
            ? item
            : {
                ...item,
                quantity: item.quantity + 1,
              }
        );
      } else {
        state.shopCartList.push(newItem);
      }
    },
    deleteFromShoppingCart(state, action: PayloadAction<number>) {
      state.shopCartList = state.shopCartList.filter(
        (shopCartObj) => shopCartObj.id != action.payload
      );
    },
    setQuantityOfProduct(state, action: PayloadAction<SetQuantity>) {
      state.shopCartList = state.shopCartList.map((item) =>
        item.id !== action.payload.id
          ? item
          : {
              ...item,
              quantity: action.payload.quantity,
            }
      );
    },
  },
});

export const {
  logout,
  login,
  addToShopCart,
  deleteFromShoppingCart,
  setQuantityOfProduct,
} = authSlice.actions;

export default authSlice;
