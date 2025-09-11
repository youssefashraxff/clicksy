import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const requireToken: boolean =
    req.url.includes('cart') ||
    req.url.includes('order') ||
    req.url.includes('wishlist');

  if (!requireToken) return next(req);

  const platform = inject(PLATFORM_ID);

  if (isPlatformBrowser(platform)) {
    const token = localStorage.getItem('token');

    if (token) {
      req = req.clone({
        setHeaders: {
          token: token,
        },
      });
    }
  }
  return next(req);
};
