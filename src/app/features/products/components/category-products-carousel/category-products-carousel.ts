import { Component, inject, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsData } from '../../interfaces/allProductsResponse';
import { ProductsServices } from '../../services/products.services';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { SingleProduct } from '../../interfaces/singleProductResponse';
import { ProductCard } from '../../../../shared/components/product-card/product-card';

@Component({
  selector: 'app-category-products-carousel',
  imports: [CarouselModule, LoadingSpinner, ProductCard],
  templateUrl: './category-products-carousel.html',
  styleUrl: './category-products-carousel.css',
})
export class CategoryProductsCarousel implements OnInit {
  @Input() product!: SingleProduct;

  categoryProducts!: ProductsData[] | undefined;

  private readonly productsServices = inject(ProductsServices);

  // Carousel Options
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navText: ['', ''],
    responsive: {
      0: { items: 2 },
      400: { items: 2 },
      740: { items: 4 },
      940: { items: 5 },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.getCategoryProducts();
  }

  getCategoryProducts(): void {
    this.productsServices
      .getAllProducts({ category: this.product.category._id, limit: 4 })
      .subscribe({
        next: (response) => {
          this.categoryProducts = response.data;
        },
      });
  }
}
