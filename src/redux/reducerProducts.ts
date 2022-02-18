import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_URL = 'https://fakestoreapi.com/';

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

interface ShopSliceState {
  shopList: ShopItem[];
  isLoading: boolean;
}

export const getItems = createAsyncThunk('products/getItems', async () => {
  const { data } = await axios.get(`${BACKEND_URL}/products`);

  return data;
});

const shopSlice = createSlice({
  name: 'shopList',
  initialState: { shopList: [], isLoading: false } as ShopSliceState,
  reducers: {},
  extraReducers: {
    [getItems.pending as unknown as string]: (state) => {
      state.isLoading = true;
    },
    [getItems.fulfilled as unknown as string]: (state, action) => {
      state.shopList = action.payload;
      state.isLoading = false;
    },
    [getItems.rejected as unknown as string]: (state) => {
      state.isLoading = false;
    },
  },
});

export default shopSlice;
