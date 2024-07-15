import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NotificationDisplay } from '../model/notification/notificationDisplay';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../model/account/user';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  huburl=environment.hubUrl;
  public hubConnection! :HubConnection;
  private notificationSource=new BehaviorSubject<NotificationDisplay[]>([]);
  notifications$=this.notificationSource.asObservable();
  createHubConnection(user:User){
    this.hubConnection=new HubConnectionBuilder()
    .withUrl(this.huburl+'notification', {
      accessTokenFactory: () => user.jwt,
    })
    .withAutomaticReconnect()
    .build();
    this.hubConnection.start()
    .then(() => console.log('SignalR Connected'))

    .catch(err => console.error('Error while starting connection: ' + err));

    this.hubConnection.on('AllNotification',notifications=>{
      this.notificationSource.next(notifications);
      console.log(JSON.stringify(notifications)+"firstt");
      
  
    })
    this.hubConnection.on('ReceiveNotification',notification=>{
      this.notifications$.pipe(take(1)).subscribe(notifications=>{
        this.notificationSource.next([notification,...notifications])
      })
    })
  
  }
  constructor(private http: HttpClient) {
    
  }
  ngOnInit(): void {
  }
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
