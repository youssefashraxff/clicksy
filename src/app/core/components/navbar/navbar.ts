import { AfterViewInit, Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../../features/authentication/services/auth.services';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements AfterViewInit {
  @Input() isLoggedIn = false;
  private readonly authenticationService = inject(AuthServices);
  ngAfterViewInit() {
    initFlowbite(); // rebinds Flowbite listeners
  }
  onSignout() {
    this.authenticationService.onSignout();
  }
}
