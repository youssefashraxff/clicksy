import { Routes } from '@angular/router';

export const AUTHENTICATION_ROUTES: Routes = [
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/sign-in/sign-in').then((module) => module.SignIn),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/sign-up/sign-up').then((module) => module.SignUp),
  },
];
