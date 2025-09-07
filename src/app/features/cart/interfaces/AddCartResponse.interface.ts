export interface CartItems {
  count: number;
  _id: string;
  product: string;
  price: number;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItems[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface AddCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}
