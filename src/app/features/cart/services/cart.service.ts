import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { API_KEYS } from '../../../core/constants/appAPIs';

@Injectable({
  providedIn: 'root',
})
export class CartService extends Basehttp {
  // Create
  addItemToCart(productId: string) {
    return this.post(
      API_KEYS.cartKey,
      { productId: productId },
      { token: localStorage.getItem('token') }
    );
  }

  // Read
  getCartItems(): any[] {
    // Implementation for retrieving cart items
    return [];
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
