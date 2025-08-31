import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { API_KEYS } from '../../../core/constants/appAPIs';
import { singleProductResponse } from '../interfaces/singleProductResponse';
import { allProductsResponse } from '../interfaces/allProductsResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductsServices extends Basehttp {
  getAllProducts() {
    return this.get<allProductsResponse>(API_KEYS.productsKey);
  }
  getSingleProduct(productId: string) {
    return this.get<singleProductResponse>(`${API_KEYS.productsKey}/productId`);
  }
}
