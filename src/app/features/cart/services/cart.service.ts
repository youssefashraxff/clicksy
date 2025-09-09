import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { API_KEYS } from '../../../core/constants/appAPIs';
import { AddCartResponse } from '../interfaces/AddCartResponse.interface';
import { GetCartResponse } from '../interfaces/GetCartResponse.interface';
import { CartData, DeleteItemResponse } from '../interfaces/DeleteItemResponse';
import { Observable } from 'rxjs';
import { UpdateItemResponse } from '../interfaces/UpdateItemResponse.interface';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService extends Basehttp {
  // Add to Cart
  addItemToCart(productId: string) {
    return this.post<AddCartResponse>(API_KEYS.cartKey, {
      productId: productId,
    });
  }

  // Get Cart Items
  getCartItems(): Observable<GetCartResponse> {
    return this.get<GetCartResponse>(API_KEYS.cartKey, undefined);
  }

  // Update
  updateCartItem(
    itemId: string,
    count: number
  ): Observable<UpdateItemResponse> {
    const token = localStorage.getItem('token');
    return this.put<UpdateItemResponse>(`${API_KEYS.cartKey}/${itemId}`, {
      count: count,
    });
  }

  // Delete
  removeItemFromCart(itemId: string): Observable<DeleteItemResponse> {
    return this.delete<DeleteItemResponse>(`${API_KEYS.cartKey}/${itemId}`);
  }

  // Clear the cart
  clearCart(): Observable<string> {
    const token = localStorage.getItem('token');
    return this.delete<string>(API_KEYS.cartKey);
  }
}
