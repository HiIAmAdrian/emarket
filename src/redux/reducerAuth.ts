import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOGGED_IN, LOGGED_OUT } from '../constants';
import { AuthSliceState, LogInAction, AddToShopCartAction } from '../types';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loginState: LOGGED_OUT,
    userToken: '',
    shopCartList: [],
  } as AuthSliceState,
  reducers: {
    logout(state) {
      state.loginState = LOGGED_OUT;
    },
    login(state, action: PayloadAction<LogInAction>) {
      state.loginState = LOGGED_IN;
      state.userToken = action.payload.token;
    },
    addToShopCart(state, action: PayloadAction<AddToShopCartAction>) {
      state.shopCartList.push(action.payload.item);
    },
  },
});

export const { logout, login, addToShopCart } = authSlice.actions;

export default authSlice;
