import { Component, Input } from '@angular/core';
import { ProductsData } from '../../../features/products/interfaces/allProductsResponse';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, NgClass],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: ProductsData;
  @Input() page!: number;
  @Input() isInCarousel!: boolean;
}
