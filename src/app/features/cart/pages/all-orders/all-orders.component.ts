import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersResponse } from '../../interfaces/GetOrdersResponse';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-all-orders',
  imports: [CurrencyPipe, CommonModule, LoadingSpinner],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent implements OnInit {
  // Injected Services
  private readonly cartService = inject(CartService);
  // Variables
  allOrders!: OrdersResponse[];

  ngOnInit(): void {
    this.getAllOrders();
  }
  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }
  getAllOrders() {
    this.cartService.getOrders(this.getUserId()).subscribe({
      next: (response) => {
        console.log(response);
        this.allOrders = response;
      },
    });
  }
}
