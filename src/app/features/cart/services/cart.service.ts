import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { API_KEYS } from '../../../core/constants/appAPIs';
import { AddCartResponse } from '../interfaces/AddCartResponse.interface';
import { GetCartResponse } from '../interfaces/GetCartResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService extends Basehttp {
  // Add to Cart
  addItemToCart(productId: string) {
    return this.post<AddCartResponse>(
      API_KEYS.cartKey,
      { productId: productId },
      { token: localStorage.getItem('token') }
    );
  }

  // Get Cart Items
  getCartItems(): Observable<GetCartResponse> {
    return this.get<GetCartResponse>(API_KEYS.cartKey, undefined, {
      token: localStorage.getItem('token'),
    });
  }

  // Update
  updateCartItem(itemId: string, quantity: number): void {
    // Implementation for updating item quantity in cart
  }

  // Delete
  removeItemFromCart(itemId: string): void {
    // Implementation for removing item from cart
  }

  // Additional method to clear the cart
  clearCart(): void {
    // Implementation for clearing the cart
  }
}
