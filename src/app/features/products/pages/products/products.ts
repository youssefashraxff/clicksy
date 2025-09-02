import { Component, inject, OnInit } from '@angular/core';
import { ProductsServices } from '../../services/products.services';
import { ProductsData } from '../../interfaces/allProductsResponse';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  imports: [LoadingSpinner, ProductCard, NgxPaginationModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  // Service Injection
  private readonly productsServices = inject(ProductsServices);
  private readonly router = inject(Router);

  allProducts: ProductsData[] | undefined;

  page: number = 1;
  totalItems: number = 1;

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productsServices
      .getAllProducts({ page: this.page, limit: 10 })
      .subscribe({
        next: (response) => {
          this.allProducts = response.data;
          this.totalItems = response.results;
        },
      });
  }
  onPageChange(page: number) {
    this.page = page;
    this.allProducts = undefined;
    this.router.navigate([], { queryParams: { page: this.page } });
    this.getAllProducts();
  }
}
