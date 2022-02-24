export interface ShopItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  quantity: number;
}

interface Rating {
  rate: number;
  count: number;
}

export interface SetQuantity {
  id: number;
  quantity: number;
}

export interface PaymentDetails {
  cardCVV: string;
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  shippingAddress: ShippingAddress;
  paymentDetails: PaymentDetails;
  shopCart: ShopItem[];
  total: number;
}
