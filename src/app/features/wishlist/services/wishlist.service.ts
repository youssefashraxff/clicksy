import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { API_KEYS } from '../../../core/constants/appAPIs';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { getWishlistResponse } from '../interfaces/getWishlistResponse';
import { addToWishlistResponse } from '../interfaces/addToWishlistResponse';
import { deleteFromWishlistResponse } from '../interfaces/deleteFromWishlistResponse';

@Injectable({
  providedIn: 'root',
})
export class WishlistService extends Basehttp {
  // Wishlist Count as Observable
  wishlistCount = new BehaviorSubject<number>(0);
  wishlistCount$ = this.wishlistCount.asObservable();

  constructor() {
    super();
    this.loadWishlistCount();
  }

  private loadWishlistCount() {
    this.getWishlist().subscribe({
      next: (respone) => {
        this.wishlistCount.next(respone.count);
      },
    });
  }

  getWishlist(): Observable<getWishlistResponse> {
    return this.http.get<getWishlistResponse>(API_KEYS.wishlistKey);
  }
  addToWishlist(productId: string): Observable<addToWishlistResponse> {
    return this.http
      .post<addToWishlistResponse>(API_KEYS.wishlistKey, {
        productId: productId,
      })
      .pipe(tap(() => this.loadWishlistCount()));
  }
  removeFromWishlist(
    productId: string
  ): Observable<deleteFromWishlistResponse> {
    return this.http
      .delete<deleteFromWishlistResponse>(
        `${API_KEYS.wishlistKey}/${productId}`
      )
      .pipe(tap(() => this.loadWishlistCount()));
  }
}
