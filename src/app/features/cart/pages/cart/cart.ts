import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartData } from '../../interfaces/GetCartResponse.interface';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  // Services
  private readonly cartService = inject(CartService);

  // Variables
  cartItems!: CartData;

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems(): void {
    this.cartService.getCartItems().subscribe({
      next: (response) => {
        this.cartItems = response.data;
        console.log(this.cartItems);
      },
    });
  }
}
