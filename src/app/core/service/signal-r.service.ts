import { User } from './../model/account/user';
import { ToastrService } from 'ngx-toastr';
// src/app/services/signalr.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  hubUrl = environment.hubUrl;
  public hubConnection!: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private Toastr: ToastrService,
    private router:Router
  ) {}

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.jwt,
      })
      .withAutomaticReconnect()
      .build();
    this.hubConnection.start().catch((error) => console.log(error));
    this.hubConnection.on('UserIsOnline', username => {
      // this.Toastr.info(username + 'has conected');
      this.onlineUsers$.pipe(take(1)).subscribe(usernames=>{
        this.onlineUsersSource.next([...usernames,username])
      })
    });
    this.hubConnection.on('UserIsOffline', (username) => {
      // this.Toastr.warning(username + 'has disconnected');
      this.onlineUsers$.pipe(take(1)).subscribe(usernames=>{
        this.onlineUsersSource.next([...usernames.filter(x=>x!==username)])
      })
    });
    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this.onlineUsersSource.next(usernames);
    });
    this.hubConnection.on('NewMessageReceived', ({username}) => {
this.Toastr.info(username+' has sent you a new message!')
.onTap.pipe(take(1))
.subscribe(()=>{

  // navigattteee
})
    });
   
  }
  stopHubConnection() {
    this.hubConnection.stop().catch((error) => console.log(error));
  }
}
