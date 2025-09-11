import { inject, Injectable } from '@angular/core';
import { CartService } from '../../features/cart/services/cart.service';
import { UpdateCartItems } from '../../features/cart/interfaces/UpdateItemResponse.interface';
import { DeleteItemResponse } from '../../features/cart/interfaces/DeleteItemResponse';
import { AddCartResponse } from '../../features/cart/interfaces/AddCartResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class SharedCartService {
  private readonly cartService = inject(CartService);

  // Add to cart
  addToCart(productId: string): AddCartResponse | undefined {
    // this.isLoading = true;
    this.cartService.addItemToCart(productId).subscribe({
      next: (response) => {
        return response;
        // this.isLoading = false;
        // this.isAddedToCart = true;
        // const cartItems: CartItems[] = response.data.products;
        // this.quantity = this.getCountForAdd(cartItems, productId);
        // this.toastrService.success(response.message);
      },
    });
    return;
  }
  updateItem(
    item: UpdateCartItems,
    operation: string
  ): UpdateCartItems | undefined {
    // this.isLoading = true;
    if (item.count === 1 && operation === 'decrement') {
      this.removeItem(item.product._id);
      return;
    }
    item.count = operation === 'increment' ? ++item.count : --item.count;

    this.cartService.updateCartItem(item.product._id, item.count).subscribe({
      next: (response) => {
        return response;
      },
      error: (err) => {
        console.log('Error from update', err);
      },
    });
    return;
  }
  removeItem(itemID: string): DeleteItemResponse | undefined {
    // this.isLoadingDelete = true;
    this.cartService.removeItemFromCart(itemID).subscribe({
      next: (response) => {
        return response;
      },
    });
    return;
  }
}
