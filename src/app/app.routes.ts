import { Routes } from '@angular/router';
import { AuthenticationLayout } from './core/layouts/authentication-layout/authentication-layout';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { authenticationGuard } from './core/guards/authentication-guard';
import { userGuard } from './core/guards/user-guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthenticationLayout,
    canActivate: [userGuard],
    loadChildren: () =>
      import('./features/authentication/authentication.routes').then(
        (module) => module.AUTHENTICATION_ROUTES
      ),
  },
  {
    canActivate: [authenticationGuard],
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
        path: 'details/:productID/:slug',
        loadComponent: () =>
          import(
            './features/products/pages/product-details/product-details'
          ).then((module) => module.ProductDetails),
      },
      {
        path: 'details/:productID',
        loadComponent: () =>
          import(
            './features/products/pages/product-details/product-details'
          ).then((module) => module.ProductDetails),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./features/categories/categories.routes').then(
            (module) => module.CATEGORIES_ROUTES
          ),
      },
      {
        path: 'details/:categoryID',
        loadComponent: () =>
          import(
            './features/products/pages/category-products/category-products'
          ).then((module) => module.CategoryProducts),
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
