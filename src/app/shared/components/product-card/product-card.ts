import { Component, Input } from '@angular/core';
import { ProductsData } from '../../../features/products/interfaces/allProductsResponse';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: ProductsData;
}
