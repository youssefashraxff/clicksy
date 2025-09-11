import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { getWishlistData } from '../../interfaces/getWishlistResponse';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { CartItemsD } from '../../../cart/interfaces/DeleteItemResponse';
import { CartItems } from '../../../cart/interfaces/AddCartResponse.interface';
import { SharedCartService } from '../../../../shared/services/shared-cart.service';
import { Cart } from '../../../cart/pages/cart/cart';
import { CartService } from '../../../cart/services/cart.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, RouterLink, LoadingSpinner],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  // Injected Services
  private readonly wishlistService = inject(WishlistService);
  private readonly sharedCartService = inject(SharedCartService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  // Variables
  allWishlistItems!: getWishlistData[];

  isLoading: boolean = false;
  isAddedToCart: boolean = false;
  quantity: number = 1;

  ngOnInit(): void {
    this.loadWishlistItems();
  }

  loadWishlistItems(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        this.allWishlistItems = response.data;
      },
      error: (error) => {
        console.error('Error fetching wishlist items:', error);
      },
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: (response) => {
        this.toastrService.success('Product removed from wishlist');
        this.loadWishlistItems();
      },
      error: (error) => {
        console.error('Error removing item from wishlist:', error);
        this.toastrService.error('Failed to remove product from wishlist');
      },
    });
  }
  // Add to cart
  addToCart(productId: string): void {
    this.isLoading = true;
    const response = this.sharedCartService.addToCart(productId);
    this.isLoading = false;
    this.isAddedToCart = true;
    const cartItems: CartItems[] = response?.data?.products ?? [];
    this.quantity = this.getCountForAdd(cartItems, productId);
    if (response?.message) {
      this.toastrService.success(response.message);
    }
  }
  // Remove from cart
  removeFromCart(productId: string): void {
    this.isLoading = true;
    this.cartService.removeItemFromCart(productId).subscribe({
      next: (response) => {
        this.isLoading = false;
        const cartItems: CartItemsD[] = response.data.products;
        this.quantity = this.getCountForDelete(cartItems, productId);
        if (this.quantity === 0) {
          this.isAddedToCart = false;
        }
        this.toastrService.success(
          'Product removed successfully from your cart'
        );
      },
    });
  }

  getCountForAdd(cartItems: CartItems[], productId: string): number {
    for (let item of cartItems) {
      if (item.product === productId) {
        console.log('[DEBUG 1 ]', item.product, '   ', productId);
        return item.count;
      }
    }
    return 0;
  }
  getCountForDelete(cartItems: CartItemsD[], productId: string): number {
    for (let item of cartItems) {
      if (item.product._id === productId) {
        console.log('[DEBUG 2 ]', item.product.id, '   ', productId);
        return item.count;
      }
    }
    return 0;
  }

  increaseQty(productId: string): void {
    this.addToCart(productId);
  }

  decreaseQty(productId: string): void {
    this.removeFromCart(productId);
  }
}
