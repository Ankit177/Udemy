import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Url } from '../classes/url';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private _http: HttpClient) {}

  sendMessage(sender_id, receiver_id, receiver_name, message): Observable<any> {
    return this._http.post(new Url().getUrl() + `/chat-messages/${sender_id}/${receiver_id}`, {
      receiver_id,
      receiver_name,
      message
    });
  }

  GetAllMessages(sender_id, receiver_id): Observable<any> {
    return this._http.get(new Url().getUrl() + `/chat-messages/${sender_id}/${receiver_id}`);
  }
}
