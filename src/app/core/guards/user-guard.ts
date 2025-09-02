import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const userGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    if (token) {
      return router.parseUrl('/home');
    }
  }
  return true;
};
