import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { API_KEYS } from '../../../core/constants/appAPIs';
import { singleProductResponse } from '../interfaces/singleProductResponse';
import { allProductsResponse } from '../interfaces/allProductsResponse';
import { Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsServices extends Basehttp {
  getAllProducts(filters?: Params) {
    const params = new HttpParams().appendAll(filters || {});
    return this.get<allProductsResponse>(API_KEYS.productsKey, params);
  }
  getSingleProduct(productId: string) {
    return this.get<singleProductResponse>(
      `${API_KEYS.productsKey}/${productId}`
    );
  }
}
