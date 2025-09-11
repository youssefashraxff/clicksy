import { AfterViewInit, Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../../features/authentication/services/auth.services';
import { FlowbiteService } from '../../services/flowbite.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements AfterViewInit, OnInit {
  @Input() isLoggedIn = false;
  private readonly authenticationService = inject(AuthServices);
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  cartItemsCount: number = 0;
  wishlistItemsCount: number = 0;

  ngOnInit(): void {
    this.getCartItemsCount();
    this.getWishlistItemsCount();
  }
  getCartItemsCount() {
    this.cartService.getCartItems().subscribe({
      next: (response) => {
        this.cartItemsCount = response.numOfCartItems;
      },
    });
  }

  getWishlistItemsCount() {
    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        this.wishlistItemsCount = response.count;
      },
    });
  }

  ngAfterViewInit() {
    this.flowbiteService.loadFlowbite((flowbite) => {
      flowbite.initFlowbite();
    });
  }

  onSignout() {
    this.authenticationService.onSignout();
  }
}
