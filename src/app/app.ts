import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FlowbiteService } from './core/services/flowbite.service';
import { Navbar } from './core/components/navbar/navbar';
import { Footer } from './core/components/footer/footer';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly flowbiteService = inject(FlowbiteService);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      flowbite.initFlowbite();
    });
  }
}
