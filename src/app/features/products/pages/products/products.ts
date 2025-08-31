import { Component, inject, OnInit } from '@angular/core';
import { ProductsServices } from '../../services/products.services';
import { ProductsData } from '../../interfaces/allProductsResponse';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  // Service Injection
  productsServices = inject(ProductsServices);

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
