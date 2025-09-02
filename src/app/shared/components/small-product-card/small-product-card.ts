import { Component, Input } from '@angular/core';
import { ProductsData } from '../../../features/products/interfaces/allProductsResponse';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-small-product-card',
  imports: [RouterLink],
  templateUrl: './small-product-card.html',
  styleUrl: './small-product-card.css',
})
export class SmallProductCard {
  @Input() product!: ProductsData;
}
