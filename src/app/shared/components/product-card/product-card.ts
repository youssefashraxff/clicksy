import { Component, inject, Input } from '@angular/core';
import { ProductsData } from '../../../features/products/interfaces/allProductsResponse';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, NgClass],
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

  addToCart(productId: string): void {
    this.isLoading = true;
    this.cartService.addItemToCart(productId).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toastrService.success(response.message);
      },
    });
  }
}
