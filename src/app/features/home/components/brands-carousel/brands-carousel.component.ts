import { Component, inject } from '@angular/core';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { BrandsService } from '../../../brands/services/brands.service';
import { BrandsData } from '../../../brands/interfaces/BrandsResponse';

@Component({
  selector: 'app-brands-carousel',
  imports: [CarouselModule],
  templateUrl: './brands-carousel.component.html',
  styleUrl: './brands-carousel.component.css',
})
export class BrandsCarouselComponent {
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
      0: { items: 2 }, // For small screens
      768: { items: 5 }, // For tablets
      1024: { items: 8 }, // For desktop
    },
    autoplay: true,
    autoplayTimeout: 3000,
    nav: false,
  };

  // Injected Service
  private readonly brandsSerive = inject(BrandsService);

  brandsImages!: BrandsData[];

  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(): void {
    this.brandsSerive.getBrands().subscribe({
      next: (response) => {
        this.brandsImages = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
