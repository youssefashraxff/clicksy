import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategriesServices } from '../../../categories/services/categries.services';
import { CategoriesData } from '../../../categories/interfaces/allCategoriesResponse';
import { error } from 'console';

@Component({
  selector: 'app-categories-carousel',
  imports: [CarouselModule],
  templateUrl: './categories-carousel.html',
  styleUrl: './categories-carousel.css',
})
export class CategoriesCarousel implements OnInit {
  // Carousel Options
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    autoplaySpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: { items: 3 }, // For small screens
      768: { items: 5 }, // For tablets
      1024: { items: 8 }, // For desktop
    },
    autoplay: true,
    autoplayTimeout: 1300,
    nav: false,
  };

  // Injected Service
  private readonly categriesServices = inject(CategriesServices);

  allCategories!: CategoriesData[];

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories(): void {
    this.categriesServices.getAllCategories().subscribe({
      next: (response) => {
        this.allCategories = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
