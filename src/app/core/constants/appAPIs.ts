import { environments } from '../../../environments/environments.dev';

export const API_KEYS = {
  registerKey: `${environments.API_URL}auth/signup`,
  loginKey: `${environments.API_URL}auth/signin`,
  productsKey: `${environments.API_URL}products`,
  categoriesKey: `${environments.API_URL}categories`,
  cartKey: `${environments.API_URL}cart`,
  brandsKey: `${environments.API_URL}brands`,
  wishlistKey: `${environments.API_URL}wishlist`,
};
