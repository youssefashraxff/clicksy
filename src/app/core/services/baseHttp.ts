import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Params } from '@angular/router';

export abstract class Basehttp {
  protected readonly http = inject(HttpClient);

  // Post
  protected post<T>(url: string, data: {}, headers?: {}) {
    return this.http.post<T>(url, data, { headers: headers });
  }
  // Get
  protected get<T>(url: string, params?: Params, headers?: {}) {
    return this.http.get<T>(url, { params: params, headers: headers });
  }
  // Put
  protected put<T>(url: string, params?: Params, headers?: {}) {
    return this.http.put<T>(url, { params: params, headers: headers });
  }
  // Delete
  protected delete<T>(url: string, headers?: {}) {
    return this.http.delete<T>(url, { headers: headers });
  }
}
