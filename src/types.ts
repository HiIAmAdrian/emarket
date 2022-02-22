import { IconButtonProps } from '@mui/material';
import store from './store/store';

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
  quantity: number;
}

export interface AuthSliceState {
  loginState: boolean;
  userRole: string;
  shopCartList: ShopItem[];
}

export interface SetQuantity {
  id: number;
  quantity: number;
}

export interface LogInAction {
  token: string;
}

export interface ItemCardProps extends ShopItem {
  handleClick: () => void;
}

export interface CheckoutSliceState {
  address: string[];
  paymentDetails: {
    cardType: string;
    cardHolder: string;
    cardNumber: string;
    expiryDate: string;
  };
}

export interface ShopSliceState {
  shopList: ShopItem[];
  isLoading: boolean;
}

export type RootState = ReturnType<typeof store.getState>;
