export interface Product {
  count: number;
  _id: string;
  product: string;
  price: number;
}

export interface Data {
  _id: string;
  cartOwner: string;
  products: Product[];
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
  data: Data;
}
