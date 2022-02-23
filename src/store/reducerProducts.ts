import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL, LOADING, NOT_LOADING } from '../constants';
import { getNbOfItems } from '../services/storageHandle';
import { ShopItem } from '../types';

export const getItems = createAsyncThunk('products/getItems', async () => {
  const limit = getNbOfItems() ? getNbOfItems() : 20;

  const { data } = await axios.get(`${BACKEND_URL}/products?limit=${limit}`);

  return data;
});

interface ShopSliceState {
  shopList: ShopItem[];
  isLoading: boolean;
}

const shopSlice = createSlice({
  name: 'shopList',
  initialState: {
    shopList: [],
    isLoading: NOT_LOADING,
  } as ShopSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.isLoading = LOADING;
    });
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.shopList = action.payload;
      state.isLoading = NOT_LOADING;
    });
    builder.addCase(getItems.rejected, (state) => {
      state.isLoading = NOT_LOADING;
    });
  },
});

export default shopSlice;
