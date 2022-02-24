import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  ADMIN,
  LOGGED,
  LOGGING,
  LOGIN_FAILED,
  LOGIN_URL,
  NOT_LOGGED,
  USER,
} from '../common/variables/constants';
import { SetQuantity, ShopItem } from '../common/variables/types';
import {
  getUserName,
  getUserToken,
  removeUserName,
  removeUserToken,
  setUserName,
  setUserToken,
} from '../common/services/storageHandler';

export const ADMIN_NAME = 'mor_2314';

interface LogInAction {
  token: string;
}

interface AuthSliceState {
  userRole: string;
  shopCartList: ShopItem[];
  loggingState: string;
}

interface UserType {
  username: string;
  password: string;
}

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (user: UserType) => {
    const { data } = await axios.post(LOGIN_URL, user);

    return { ...data, username: user.username };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userRole: getUserName() === ADMIN_NAME ? ADMIN : USER,
    shopCartList: [],
    loggingState: getUserToken() ? LOGGED : NOT_LOGGED,
  } as AuthSliceState,

  reducers: {
    logout(state) {
      state.loggingState = NOT_LOGGED;
      state.shopCartList = [];
      removeUserName();
      removeUserToken();
    },
    login(state, action: PayloadAction<LogInAction>) {
      state.loggingState = LOGGED;
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
    emptyShoppingCart(state) {
      state.shopCartList = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.loggingState = LOGGING;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.loggingState = LOGGED;
      setUserName(action.payload.username);
      setUserToken(action.payload.token);
      state.userRole = getUserName() === ADMIN_NAME ? ADMIN : USER;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.loggingState = LOGIN_FAILED;
      alert('Login Failed! Try changing your credentials.');
    });
  },
});

export const {
  logout,
  login,
  addToShopCart,
  deleteFromShoppingCart,
  setQuantityOfProduct,
  emptyShoppingCart,
} = authSlice.actions;

export default authSlice;
