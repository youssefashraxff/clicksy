import { Component } from '@angular/core';
import { MainCarousel } from '../../components/main-carousel/main-carousel';
import { CategoriesCarousel } from '../../components/categories-carousel/categories-carousel';
import { PopularProducts } from '../../components/popular-products/popular-products';

@Component({
  selector: 'app-user-home',
  imports: [MainCarousel, CategoriesCarousel, PopularProducts],
  templateUrl: './user-home.html',
  styleUrl: './user-home.css',
})
export class UserHome {}
