import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL, LOADING, NOT_LOADING } from '../constants';
import { ShopSliceState } from '../types';

export const getItems = createAsyncThunk('products/getItems', async () => {
  const { data } = await axios.get(`${BACKEND_URL}/products`);

  return data;
});

const shopSlice = createSlice({
  name: 'shopList',
  initialState: { shopList: [], isLoading: NOT_LOADING } as ShopSliceState,
  reducers: {},
  extraReducers: {
    [getItems.pending as unknown as string]: (state) => {
      state.isLoading = LOADING;
    },
    [getItems.fulfilled as unknown as string]: (state, action) => {
      state.shopList = action.payload;
      state.isLoading = NOT_LOADING;
    },
    [getItems.rejected as unknown as string]: (state) => {
      state.isLoading = NOT_LOADING;
    },
  },
});

export default shopSlice;
