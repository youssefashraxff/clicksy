import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import {
  CartData,
  CartItems,
} from '../../interfaces/GetCartResponse.interface';
import {
  UpdateCartData,
  UpdateCartItems,
} from '../../interfaces/UpdateItemResponse.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsServices } from '../../../products/services/products.services';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  // Services
  private readonly cartService = inject(CartService);
  private readonly productsServices = inject(ProductsServices);

  // Variables
  cartItems!: CartData | UpdateCartData | undefined;
  cartProducts!: CartItems[] | undefined;
  TotalDiscount: number = 0;
  totalCartPrice: number = 0;
  isLoading: boolean = false;
  isLoadingDelete: boolean = false;

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems(): void {
    this.isLoading = true;
    this.cartService.getCartItems().subscribe({
      next: (response) => {
        this.handleAfterResponse(response);
      },
    });
  }
  removeItem(itemID: string): void {
    this.isLoadingDelete = true;
    this.cartService.removeItemFromCart(itemID).subscribe({
      next: (response) => {
        this.handleAfterResponse(response);
      },
    });
  }
  updateItem(item: UpdateCartItems, operation: string) {
    this.handlePreUpdate(item, operation);
    this.cartService.updateCartItem(item.product._id, item.count).subscribe({
      next: (response) => {
        return response;
      },
      error: (err) => {
        console.log('Error from update', err);
      },
    });
  }
  handlePreUpdate(item: UpdateCartItems, operation: string) {
    this.isLoading = true;
    if (item.count === 1 && operation === 'decrement') {
      this.removeItem(item.product._id);
      return;
    }
    item.count = operation === 'increment' ? ++item.count : --item.count;
  }
  removeCart(): void {
    this.cartService.clearCart().subscribe({
      next: (response) => {
        this.cartItems = undefined;
        this.cartProducts = undefined;
        this.totalCartPrice = 0;
        this.TotalDiscount = 0;
        this.isLoading = false;
        this.isLoadingDelete = false;
      },
    });
  }
  handleAfterResponse(response: any) {
    this.isLoading = false;
    this.isLoadingDelete = false;
    this.cartItems = response.data;
    this.cartProducts = response.data.products;
    this.totalCartPrice = response.data.totalCartPrice;
    if (response.numOfCartItems === 0) {
      this.cartItems = undefined;
      this.cartProducts = undefined;
    }
  }
}
