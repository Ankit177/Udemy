import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this._http.get(`${BASE_URL}/users`);
  }
  getUserById(id): Observable<any> {
    console.log(id);
    return this._http.get(`${BASE_URL}/user/${id}`);
  }
  getUserByName(name): Observable<any> {
    return this._http.get(`${BASE_URL}/users/${name}`);
  }
  followUser(followedUser): Observable<any> {
    return this._http.post(`${BASE_URL}/follow-user`, {
      followedUser
    });
  }
  UnfollowUser(unfollowUser) {
    return this._http.post(`${BASE_URL}/unfollow-user`, {
      unfollowUser
    });
  }
  MarkNotification(id, del?): Observable<any> {
    return this._http.post(`${BASE_URL}/mark/${id}`, {
      id,
      del
    });
  }
  markAllNotificationAsRead(): Observable<any> {
    return this._http.post(`${BASE_URL}/mark-all`, {
      all: true
    });
  }
}
