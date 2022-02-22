import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL, LOADING, NOT_LOADING } from '../constants';
import { ShopSliceState } from '../types';

export const getItems = createAsyncThunk('products/getItems', async () => {
  let limit = 20;
  if (localStorage.getItem('numberOfItems'))
    limit = JSON.parse(localStorage.getItem('numberOfItems') as string);

  const { data } = await axios.get(`${BACKEND_URL}/products?limit=${limit}`);

  return data;
});

const shopSlice = createSlice({
  name: 'shopList',
  initialState: { shopList: [], isLoading: NOT_LOADING } as ShopSliceState,
  reducers: {},
  //builder callback
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
