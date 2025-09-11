import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { API_KEYS } from '../../../core/constants/appAPIs';
import { Observable } from 'rxjs';
import { getWishlistResponse } from '../interfaces/getWishlistResponse';
import { addToWishlistResponse } from '../interfaces/addToWishlistResponse';
import { deleteFromWishlistResponse } from '../interfaces/deleteFromWishlistResponse';

@Injectable({
  providedIn: 'root',
})
export class WishlistService extends Basehttp {
  getWishlist(): Observable<getWishlistResponse> {
    return this.http.get<getWishlistResponse>(API_KEYS.wishlistKey);
  }
  addToWishlist(productId: string): Observable<addToWishlistResponse> {
    return this.http.post<addToWishlistResponse>(API_KEYS.wishlistKey, {
      productId: productId,
    });
  }
  removeFromWishlist(
    productId: string
  ): Observable<deleteFromWishlistResponse> {
    return this.http.delete<deleteFromWishlistResponse>(
      `${API_KEYS.wishlistKey}/${productId}`
    );
  }
}
