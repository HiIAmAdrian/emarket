import { configureStore } from '@reduxjs/toolkit';
import shopList from './reducer'

const store = configureStore({reducer: {shopList: shopList.reducer}});

type RootState = ReturnType<typeof store.getState>

export const getShopList = (state:RootState) => state.shopList.shopList;
export default store;