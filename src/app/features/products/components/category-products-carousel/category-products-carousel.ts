import { Component, inject, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsData } from '../../interfaces/allProductsResponse';
import { ProductsServices } from '../../services/products.services';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { SmallProductCard } from '../../../../shared/components/small-product-card/small-product-card';
import { SingleProduct } from '../../interfaces/singleProductResponse';

@Component({
  selector: 'app-category-products-carousel',
  imports: [CarouselModule, LoadingSpinner, SmallProductCard],
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
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
    },
    nav: true,
  };

  ngOnInit(): void {
    console.log('Window width:', window.innerWidth);
    if (this.product && this.product.category?._id) {
      console.log('Category ID in carousel:', this.product.category._id);
      this.getCategoryProducts();
    } else {
      console.warn('Product or category ID not available yet.');
    }
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
