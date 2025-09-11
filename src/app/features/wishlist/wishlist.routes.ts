import { Routes } from '@angular/router';

export const WISHLIST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/wishlist/wishlist.component').then(
        (module) => module.WishlistComponent
      ),
  },
];
