import { Component, inject, OnChanges, OnInit } from '@angular/core';
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
import { SharedCartService } from '../../../../shared/services/shared-cart.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  // Services
  private readonly sharedCartService = inject(SharedCartService);
  private readonly cartService = inject(CartService);

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
        console.log('Response from get cart', response);
        this.handleAfterResponse(response);
      },
    });
  }
  removeItem(itemID: string): void {
    this.isLoadingDelete = true;
    this.handleAfterResponse(this.sharedCartService.removeItem(itemID));
  }
  updateItem(item: UpdateCartItems, operation: string) {
    this.isLoading = true;
    this.handleAfterResponse(
      this.sharedCartService.updateItem(item, operation)
    );
    return;
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
