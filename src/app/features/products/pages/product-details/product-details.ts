import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductsServices } from '../../services/products.services';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleProduct } from '../../interfaces/singleProductResponse';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { PopularProducts } from '../../../home/components/popular-products/popular-products';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CategoryProductsCarousel } from '../../components/category-products-carousel/category-products-carousel';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../cart/services/cart.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [
    LoadingSpinner,
    PopularProducts,
    CategoryProductsCarousel,
    CarouselModule,
    CurrencyPipe,
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  productDetails!: SingleProduct | undefined;
  productID!: string;
  page!: number;
  // Service Inject
  private readonly productsServices = inject(ProductsServices);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly toastrService = inject(ToastrService);

  isLoading: boolean = false;
  isAddedToCart: boolean = false;

  // Carousel Options
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navText: ['', ''],
    responsive: {
      0: { items: 4 },
      400: { items: 3 },
      740: { items: 3 },
      940: { items: 3 },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe({
      next: (response) => {
        console.log('Page number :', response.get('page'));
        this.page = Number(response.get('page'));
      },
    });
  }
  // Get ID from routing
  constructor() {
    this.activatedRoute.paramMap.subscribe({
      next: (response) => {
        this.productID = response.get('productID') as string;
        this.productDetails = undefined;
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        this.getSingleProduct();
      },
    });
  }

  getSingleProduct(): void {
    this.productsServices
      .getSingleProduct(this.productID, { page: this.page })
      .subscribe({
        next: (response) => {
          this.productDetails = response.data;
          this.router.navigate([], { queryParams: { page: this.page } });
        },
      });
  }

  // Add to cart
  addToCart(productId: string): void {
    this.isLoading = true;
    this.cartService.addItemToCart(productId).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isAddedToCart = true;
        this.toastrService.success(response.message);
      },
    });
  }
}
