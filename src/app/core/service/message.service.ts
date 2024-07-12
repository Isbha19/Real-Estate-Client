import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}
 getMessages(container: string): Observable<Message[]> {
    let params = new HttpParams().set('container', container);

    return this.http.get<Message[]>(`${environment.apiUrl}Messages/get-messages-for-user`, { params });
  }
}
