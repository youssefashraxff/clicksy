import { AfterViewInit, Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../../features/authentication/services/auth.services';
import { FlowbiteService } from '../../services/flowbite.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements AfterViewInit {
  @Input() isLoggedIn = false;
  private readonly authenticationService = inject(AuthServices);
  private readonly flowbiteService = inject(FlowbiteService);

  ngAfterViewInit() {
    this.flowbiteService.loadFlowbite((flowbite) => {
      flowbite.initFlowbite();
    });
  }

  onSignout() {
    this.authenticationService.onSignout();
  }
}
