import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { API_KEYS } from '../../../core/constants/appAPIs';
import { Observable } from 'rxjs';
import { BrandsResponse } from '../interfaces/brandsResponse';

@Injectable({
  providedIn: 'root',
})
export class BrandsService extends Basehttp {
  getBrands(): Observable<BrandsResponse> {
    return this.http.get<BrandsResponse>(API_KEYS.brandsKey);
  }
}
