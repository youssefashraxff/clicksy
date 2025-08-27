import { Routes } from '@angular/router';
import { AuthenticationLayout } from './core/layouts/authentication-layout/authentication-layout';
import { MainLayout } from './core/layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: AuthenticationLayout,
    loadChildren: () =>
      import('./features/authentication/authentication.routes').then(
        (module) => module.AUTHENTICATION_ROUTES
      ),
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./features/home/home.routes').then(
            (module) => module.HOME_ROUTES
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./features/cart/cart.routes').then(
            (module) => module.CART_ROUTES
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.routes').then(
            (module) => module.PRODUCTS_ROUTES
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./features/categories/categories.routes').then(
            (module) => module.CATEGORIES_ROUTES
          ),
      },
      {
        path: 'brands',
        loadChildren: () =>
          import('./features/brands/brands.routes').then(
            (module) => module.BRANDS_ROUTES
          ),
      },
    ],
  },
];
