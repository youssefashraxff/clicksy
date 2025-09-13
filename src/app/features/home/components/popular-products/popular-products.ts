import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductsServices } from '../../../products/services/products.services';
import { ProductsData } from '../../../products/interfaces/allProductsResponse';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsSearchPipe } from '../../../../shared/pipes/products-search-pipe';

@Component({
  selector: 'app-popular-products',
  imports: [
    ProductCard,
    LoadingSpinner,
    NgxPaginationModule,
    FormsModule,
    ProductsSearchPipe,
  ],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.css',
})
export class PopularProducts implements OnInit {
  // Service Injection
  private readonly productsServices = inject(ProductsServices);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  allProducts: ProductsData[] | undefined;
  searchText: string = '';

  totalItems: number = 1;
  @Input() page!: number;

  constructor() {
    this.activatedRoute.queryParamMap.subscribe({
      next: (response) => {
        this.page = Number(response.get('page'));
        console.log('pageeeee', this.page);
      },
    });
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productsServices
      .getAllProducts({ page: this.page, limit: 20 })
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
