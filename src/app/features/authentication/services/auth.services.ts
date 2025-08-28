import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { registerUserResponse } from '../interfaces/registerUserResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  constructor(private http: HttpClient) {}

  registerUser(userDate: Object): Observable<registerUserResponse> {
    return this.http.post<registerUserResponse>(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userDate
    );
  }
}
