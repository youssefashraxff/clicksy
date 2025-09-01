import { Component, inject, OnInit } from '@angular/core';
import { ProductsServices } from '../../../products/services/products.services';
import { ProductsData } from '../../../products/interfaces/allProductsResponse';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-popular-products',
  imports: [ProductCard, LoadingSpinner, NgxPaginationModule],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.css',
})
export class PopularProducts implements OnInit {
  // Service Injection
  private readonly productsServices = inject(ProductsServices);

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
    this.getAllProducts();
  }
}
