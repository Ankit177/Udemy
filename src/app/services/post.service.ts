import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'https://chat-app-backend-cyowohpgjb.now.sh/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private _http: HttpClient) {}

  addPost(body): Observable<any> {
    return this._http.post(`${BASE_URL}/post/add-post`, body);
  }
  getAllPost(): Observable<any> {
    return this._http.get(`${BASE_URL}/posts`);
  }
  getPost(id): Observable<any> {
    return this._http.get(`${BASE_URL}/post/${id}`);
  }
  addLike(body): Observable<any> {
    return this._http.post(`${BASE_URL}/post/add-like`, body);
  }
  addComment(postId, comment): Observable<any> {
    return this._http.post(`${BASE_URL}/post/add-comment`, {
      postId,
      comment
    });
  }
}
