import { Component, inject, Input } from '@angular/core';
import { ProductsData } from '../../../features/products/interfaces/allProductsResponse';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CartItems } from '../../../features/cart/interfaces/AddCartResponse.interface';
import { CartItemsD } from '../../../features/cart/interfaces/DeleteItemResponse';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, NgClass, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: ProductsData;
  @Input() page!: number;
  @Input() isInCarousel!: boolean;

  // Services
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  // Variables
  isLoading: boolean = false;

  isAddedToWishList: boolean = false;
  isAddedToCart: boolean = false;

  originalPrice: number | undefined;
  discountedPrice: number | undefined;

  quantity: number = 1;

  constructor() {
    this.originalPrice = this.product?.price;
    this.discountedPrice = this.product?.priceAfterDiscount;
  }

  // Add to cart
  addToCart(productId: string): void {
    this.isLoading = true;
    this.cartService.addItemToCart(productId).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isAddedToCart = true;
        const cartItems: CartItems[] = response.data.products;
        this.quantity = this.getCountForAdd(cartItems, productId);
        this.toastrService.success(response.message);
      },
    });
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

  // Add to wishlist
  addToWishList(productId: string): void {
    this.isAddedToWishList = !this.isAddedToWishList;
  }

  increaseQty(productId: string): void {
    this.addToCart(productId);
  }

  decreaseQty(productId: string): void {
    this.removeFromCart(productId);
  }
}
