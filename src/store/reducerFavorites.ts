import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopItem } from '../common/variables/types';

interface FavoritesSliceState {
  favoritesList: ShopItem[];
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoritesList: [],
  } as FavoritesSliceState,
  reducers: {
    addToFavoritesList(state, action: PayloadAction<ShopItem>) {
      const newItem = { ...action.payload, quantity: 1 };
      if (state.favoritesList.find((item) => item.id === action.payload.id)) {
        state.favoritesList = state.favoritesList.map((item) =>
          item.id !== action.payload.id
            ? item
            : {
                ...item,
                quantity: item.quantity + 1,
              }
        );
      } else {
        state.favoritesList.push(newItem);
      }
    },
    deleteFromFavorites(state, action: PayloadAction<number>) {
      state.favoritesList = state.favoritesList.filter(
        (favoriteObj) => favoriteObj.id != action.payload
      );
    },
  },
});

export const { addToFavoritesList, deleteFromFavorites } =
  favoritesSlice.actions;

export default favoritesSlice;
