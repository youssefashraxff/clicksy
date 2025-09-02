import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  allProductsResponse,
  ProductsData,
} from '../../interfaces/allProductsResponse';
import { ProductsServices } from '../../services/products.services';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductCard } from '../../../../shared/components/product-card/product-card';

@Component({
  selector: 'app-category-products',
  imports: [LoadingSpinner, NgxPaginationModule, ProductCard],
  templateUrl: './category-products.html',
  styleUrl: './category-products.css',
})
export class CategoryProducts {
  categoryProducts!: ProductsData[] | undefined;
  categoryID!: string;

  page: number = 1;
  totalItems: number = 1;
  // Service Inject
  private readonly productsServices = inject(ProductsServices);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe({
      next: (response) => {
        // console.log('Page number :', response.get('page'));
        this.page = Number(response.get('page'));
      },
    });
  }
  // Get ID from routing
  constructor() {
    this.activatedRoute.paramMap.subscribe({
      next: (response) => {
        this.categoryID = response.get('categoryID') as string;
        this.categoryProducts = undefined;
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        this.getCategoryProducts();
      },
    });
  }

  getCategoryProducts(): void {
    this.productsServices
      .getAllProducts({ category: this.categoryID, page: this.page, limit: 8 })
      .subscribe({
        next: (response) => {
          this.categoryProducts = response.data;
          this.totalItems = response.results;
          console.log('respoo', response);
          this.router.navigate([], { queryParams: { page: this.page } });
        },
      });
  }
  onPageChange(page: number) {
    this.page = page;
    this.categoryProducts = undefined;
    this.router.navigate([], { queryParams: { page: this.page } });
    this.getCategoryProducts();
  }
}
