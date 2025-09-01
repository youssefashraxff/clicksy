import { Component, inject, OnInit } from '@angular/core';
import { ProductsServices } from '../../services/products.services';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleProduct } from '../../interfaces/singleProductResponse';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-product-details',
  imports: [LoadingSpinner],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  productDetails!: SingleProduct;
  productID!: string;
  // Service Inject
  private readonly productsService = inject(ProductsServices);
  private readonly activatedRoute = inject(ActivatedRoute);

  // Get ID from routing

  constructor() {
    this.productID = this.activatedRoute.snapshot.params['productID'];
  }
  ngOnInit(): void {
    this.getSingleProduct();
  }
  getSingleProduct(): void {
    this.productsService.getSingleProduct(this.productID).subscribe({
      next: (response) => {
        this.productDetails = response.data;
      },
    });
  }
}
