import { Component, inject } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { BrandsData } from '../../interfaces/BrandsResponse';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.html',
  styleUrl: './brands.css',
})
export class Brands {
  // Brands Service
  private readonly brandsService = inject(BrandsService);

  allBrands!: BrandsData[];

  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands() {
    this.brandsService.getBrands().subscribe({
      next: (response) => {
        this.allBrands = response.data;
      },
    });
  }
}
