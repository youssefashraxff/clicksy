import { Component, Input } from '@angular/core';
import { ProductsData } from '../../../features/products/interfaces/allProductsResponse';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: ProductsData;
}
