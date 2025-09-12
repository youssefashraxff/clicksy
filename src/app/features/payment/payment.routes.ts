import { Routes } from '@angular/router';

export const PAYMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/checkout-page/checkout-page.component').then(
        (module) => module.CheckoutPageComponent
      ),
  },
];
