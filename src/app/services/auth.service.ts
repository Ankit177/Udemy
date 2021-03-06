import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'https://chat-app-backend-cyowohpgjb.now.sh/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  registerUser(body): Observable<any> {
    return this._http.post(`${BASE_URL}/register`, body);
  }
  loginUser(body): Observable<any> {
    return this._http.post(`${BASE_URL}/login`, body);
  }
}
