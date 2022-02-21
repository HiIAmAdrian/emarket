import { IconButtonProps } from '@mui/material';
import store from './redux/store';

export interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export interface ShopItem {
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

export interface AuthSliceState {
  loginState: boolean;
  userToken: string;
  shopCartList: ShopItem[];
}

export interface LogInAction {
  token: string;
}

export interface AddToShopCartAction {
  item: ShopItem;
}

export interface ShopSliceState {
  shopList: ShopItem[];
  isLoading: boolean;
}

export type RootState = ReturnType<typeof store.getState>;
