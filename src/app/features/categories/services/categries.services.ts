import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { allCategoriesResponse } from '../interfaces/allCategoriesResponse';
import { API_KEYS } from '../../../core/constants/appAPIs';

@Injectable({
  providedIn: 'root',
})
export class CategriesServices extends Basehttp {
  getAllCategories() {
    return this.get<allCategoriesResponse>(API_KEYS.categoriesKey);
  }
}
