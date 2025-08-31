import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class Basehttp {
  protected readonly http = inject(HttpClient);

  post<T>(url: string, data: {}) {
    return this.http.post<T>(url, data);
  }

  get<T>(url: string) {
    return this.http.get<T>(url);
  }
}
