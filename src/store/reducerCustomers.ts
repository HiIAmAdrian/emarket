import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL, LOADING, NOT_LOADING } from '../constants';

interface Geolocation {
  lat: string;
  long: string;
}

interface Address {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: Geolocation;
}

export interface Customer {
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  address: Address;
  phone: string;
}

interface Name {
  firstname: string;
  lastname: string;
}

interface CustomerSliceState {
  customers: Customer[];
  isLoading: boolean;
}

const initialState: CustomerSliceState = {
  customers: [],
  isLoading: NOT_LOADING,
};

export const customersThunk = createAsyncThunk('customers/get', async () => {
  const { data } = await axios.get(`${BACKEND_URL}/users`);

  return data;
});

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(customersThunk.pending, (state) => {
      state.isLoading = LOADING;
    });
    builder.addCase(customersThunk.fulfilled, (state, action) => {
      state.customers = action.payload;
      state.isLoading = NOT_LOADING;
    });
    builder.addCase(customersThunk.rejected, (state) => {
      state.isLoading = NOT_LOADING;
    });
  },
});

export default customersSlice;
