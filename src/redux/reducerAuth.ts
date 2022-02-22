import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOGGED_IN, LOGGED_OUT, USER, ADMIN, ADMIN_NAME } from '../constants';
import { AuthSliceState, LogInAction, SetQuantity, ShopItem } from '../types';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loginState: LOGGED_OUT,
    userRole: USER,
    shopCartList: [],
  } as AuthSliceState,
  reducers: {
    logout(state) {
      state.loginState = LOGGED_OUT;
      state.shopCartList = [];
      localStorage.clear();
    },
    login(state, action: PayloadAction<LogInAction>) {
      state.loginState = LOGGED_IN;
      localStorage.setItem('userToken', JSON.stringify(action.payload.token));
      state.userRole =
        JSON.parse(localStorage.getItem('userName') as string) === ADMIN_NAME
          ? ADMIN
          : USER;
    },
    addToShopCart(state, action: PayloadAction<ShopItem>) {
      const newItem = { ...action.payload, quantity: 1 };
      state.shopCartList.push(newItem);
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
