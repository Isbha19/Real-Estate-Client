// src/app/services/signalr.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  messages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() { }

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7230/chathub')
      .build();

    this.hubConnection.start()
    .then(() => {
      console.log('Connection started');
      this.addReceiveMessageListener();
      this.addReceiveMessageNotificationListener();
    })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  addReceiveMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (senderId: string, message: string) => {
      console.log(`ReceiveMessage event: ${senderId}, ${message}`);
      const currentMessages = this.messages.getValue();
      currentMessages.push(`${senderId}: ${message}`);
      this.messages.next(currentMessages);
    });
  }

  addReceiveMessageNotificationListener = () => {
    this.hubConnection.on('ReceiveMessageNotification', (senderId: string) => {
      console.log(`ReceiveMessageNotification event: ${senderId}`);
    });
  }

  sendMessage = (receiverId: string, senderId: string, message: string) => {
    this.hubConnection.invoke('SendMessage', senderId, receiverId, message)
        .catch(err => console.error(err));
}

}
