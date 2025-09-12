import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { API_KEYS } from '../../../core/constants/appAPIs';
import { AddCartResponse } from '../interfaces/AddCartResponse.interface';
import { GetCartResponse } from '../interfaces/GetCartResponse.interface';
import { CartData, DeleteItemResponse } from '../interfaces/DeleteItemResponse';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UpdateItemResponse } from '../interfaces/UpdateItemResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService extends Basehttp {
  // Add to cart item count
  cartitemCount = new BehaviorSubject<number>(0);
  cartitemCount$ = this.cartitemCount.asObservable();

  constructor() {
    super();
    this.loadCartCount();
  }

  private loadCartCount() {
    this.getCartItems().subscribe({
      next: (response) => {
        this.cartitemCount.next(response.numOfCartItems);
        console.log('Num of cart items', this.cartitemCount);
      },
    });
  }

  // Get Cart Items
  getCartItems(): Observable<GetCartResponse> {
    return this.get<GetCartResponse>(API_KEYS.cartKey, undefined);
  }

  // Add to Cart
  addItemToCart(productId: string) {
    return this.post<AddCartResponse>(API_KEYS.cartKey, {
      productId: productId,
    }).pipe(tap(() => this.loadCartCount()));
  }

  // Update
  updateCartItem(
    itemId: string,
    count: number
  ): Observable<UpdateItemResponse> {
    return this.put<UpdateItemResponse>(`${API_KEYS.cartKey}/${itemId}`, {
      count: count,
    });
  }

  // Delete
  removeItemFromCart(itemId: string): Observable<DeleteItemResponse> {
    return this.delete<DeleteItemResponse>(
      `${API_KEYS.cartKey}/${itemId}`
    ).pipe(tap(() => this.loadCartCount()));
  }

  // Clear the cart
  clearCart(): Observable<string> {
    const token = localStorage.getItem('token');
    return this.delete<string>(API_KEYS.cartKey);
  }
}
