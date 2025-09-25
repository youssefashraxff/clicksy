import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

export const authenticationGuard: CanActivateFn = (
  route,
  state
): boolean | UrlTree => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = jwtDecode(token) as { id: string };
      console.log(jwtDecode(token));
      localStorage.setItem('userId', userData.id);
      return true;
    }
  }
  return router.parseUrl('/signin');
};
