import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../../features/authentication/services/auth.services';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  @Input() isLoggedIn = false;
  private readonly authenticationService = inject(AuthServices);
  onSignout() {
    this.authenticationService.onSignout();
  }
}
