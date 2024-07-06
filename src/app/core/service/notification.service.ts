import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NotificationDisplay } from '../model/notification/notificationDisplay';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(private http: HttpClient) {}
  getUserNotifications() {
    return this.http.get<NotificationDisplay[]>(`${environment.apiUrl}Notification/get-user-notifications`);
  }
  getUnopenedCount() {
    return this.http.get<number>(`${environment.apiUrl}Notification/unopened-count`);
  }
  markNotificationsAsOpened() {
    return this.http.post(`${environment.apiUrl}Notification/markAsOpened`, {});
  }
  markNotificationsAsRead(notificationId:number) {
    return this.http.post(`${environment.apiUrl}Notification/mark-as-read/${notificationId}`, {});
  }
}
