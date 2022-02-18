import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShopItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface AuthSliceState {
  isLoggedIn: boolean;
  userToken: string;
  shopCartList: ShopItem[];
}

interface LogInAction {
  token: string;
}

interface AddToShopCartAction {
  item: ShopItem;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userToken: '',
    shopCartList: [],
  } as AuthSliceState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      console.log('dcccc');
    },
    login(state, action: PayloadAction<LogInAction>) {
      state.isLoggedIn = true;
      state.userToken = action.payload.token;
    },
    addToShopCart(state, action: PayloadAction<AddToShopCartAction>) {
      state.shopCartList.push(action.payload.item);
    },
  },
});

export const { logout, login, addToShopCart } = authSlice.actions;

export default authSlice;
