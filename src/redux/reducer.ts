import { createAsyncThunk ,createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = 'https://fakestoreapi.com/';

interface ShopItem{
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}

interface ShopSliceState {
    shopList: ShopItem[],
    isLoading: boolean
}

export const getItems = createAsyncThunk(
    'products/getItems',
    async () => {
        const { data } = await axios.get(`${BACKEND_URL}/products`);
        return data;
    }
)

const shopSlice = createSlice({
    name: "shopList",
    initialState: { shopList: [], isLoading: false } as ShopSliceState,
    reducers: {},
    extraReducers: {
        [getItems.pending as any]: (state) => {
            state.isLoading = true;
        },
        [getItems.fulfilled as any]: (state, action) => {
            state.shopList = action.payload;
            state.isLoading = false;
        },
        [getItems.rejected as any]: (state) => {
            state.isLoading = false;
        }
    }
    
})

export default shopSlice;
