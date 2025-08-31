import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-carousel',
  imports: [CarouselModule],
  templateUrl: './main-carousel.html',
  styleUrl: './main-carousel.css',
})
export class MainCarousel {
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
    items: 1,
    autoplay: true,
    autoplayTimeout: 4000,
    nav: false,
  };
}
