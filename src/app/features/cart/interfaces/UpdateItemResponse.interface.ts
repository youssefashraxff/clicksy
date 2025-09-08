import { Cart } from '../pages/cart/cart';

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface UpdateCartItems {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface UpdateCartData {
  _id: string;
  cartOwner: string;
  products: UpdateCartItems[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface UpdateItemResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: UpdateCartData;
}
