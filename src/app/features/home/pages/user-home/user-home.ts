import { Component } from '@angular/core';
import { MainCarousel } from '../../components/main-carousel/main-carousel';
import { CategoriesCarousel } from '../../components/categories-carousel/categories-carousel';
import { PopularProducts } from '../../components/popular-products/popular-products';
import { BrandsCarouselComponent } from '../../components/brands-carousel/brands-carousel.component';

@Component({
  selector: 'app-user-home',
  imports: [
    MainCarousel,
    CategoriesCarousel,
    PopularProducts,
    BrandsCarouselComponent,
  ],
  templateUrl: './user-home.html',
  styleUrl: './user-home.css',
})
export class UserHome {}
