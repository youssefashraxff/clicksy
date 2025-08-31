import { Component, inject, OnInit } from '@angular/core';
import { ProductsServices } from '../../../products/services/products.services';
import { ProductsData } from '../../../products/interfaces/allProductsResponse';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-popular-products',
  imports: [ProductCard, LoadingSpinner],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.css',
})
export class PopularProducts implements OnInit {
  // Service Injection
  private readonly productsServices = inject(ProductsServices);

  allProducts!: ProductsData[];

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productsServices.getAllProducts().subscribe({
      next: (response) => {
        // console.log(response.data);
        this.allProducts = response.data;
      },
    });
  }
}
