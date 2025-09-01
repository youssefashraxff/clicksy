import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Params } from '@angular/router';

export class Basehttp {
  protected readonly http = inject(HttpClient);

  post<T>(url: string, data: {}) {
    return this.http.post<T>(url, data);
  }

  get<T>(url: string, params?: Params) {
    return this.http.get<T>(url, { params: params });
  }
}
