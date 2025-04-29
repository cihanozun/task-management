import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(signUpRequest: any): Observable<any>{
    return this.http.post<any>('http://localhost:8080/api/auth/signup', signUpRequest);
  }

  login(loginRequest: any): Observable<any>{
    return this.http.post<any>('http://localhost:8080/api/auth/login', loginRequest);
  }
}
