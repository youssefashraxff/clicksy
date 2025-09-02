import { Component, inject, OnInit } from '@angular/core';
import { CategriesServices } from '../../services/categries.services';
import { CategoriesData } from '../../interfaces/allCategoriesResponse';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [LoadingSpinner, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  // Categories Service
  private readonly categoriesServices = inject(CategriesServices);

  allCategories!: CategoriesData[];

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this.categoriesServices.getAllCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.allCategories = response.data;
        console.log(this.allCategories[0].image, 'image');
      },
    });
  }
}
