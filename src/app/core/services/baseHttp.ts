import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

export abstract class Basehttp {
  protected readonly http = inject(HttpClient);

  // Post
  protected post<T>(url: string, data: {}, headers?: {}): Observable<T> {
    return this.http.post<T>(url, data, { headers: headers });
  }
  // Get
  protected get<T>(url: string, params?: Params, headers?: {}): Observable<T> {
    return this.http.get<T>(url, { params: params, headers: headers });
  }
  // Put
  protected put<T>(
    url: string,
    body?: any,
    options?: { params?: Params; headers?: HttpHeaders }
  ): Observable<T> {
    return this.http.put<T>(url, body, options);
  }
  // Delete
  protected delete<T>(url: string, headers?: {}): Observable<T> {
    return this.http.delete<T>(url, { headers: headers });
  }
}
