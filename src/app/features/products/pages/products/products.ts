import { Component, inject, OnInit } from '@angular/core';
import { ProductsServices } from '../../services/products.services';
import { ProductsData } from '../../interfaces/allProductsResponse';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-products',
  imports: [LoadingSpinner],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
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
