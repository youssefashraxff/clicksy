import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { registerUserResponse } from '../interfaces/registerUserResponse';
import { API_KEYS } from '../../../core/constants/appAPIs'; // Update the path as needed

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  constructor(private http: HttpClient) {}

  registerUser(userDate: Object): Observable<registerUserResponse> {
    return this.http.post<registerUserResponse>(API_KEYS.registerKey, userDate);
  }
  loginUser(userDate: Object): Observable<registerUserResponse> {
    return this.http.post<registerUserResponse>(API_KEYS.loginKey, userDate);
  }
}
