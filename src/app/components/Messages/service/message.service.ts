import { UserChats } from './../model/userChat';
import { Group } from '../../../core/model/group';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, BehaviorSubject, take } from 'rxjs';
import { Message } from '../../../core/model/message';
import { HubConnection, HubConnectionBuilder,HubConnectionState } from '@microsoft/signalr';
import { User } from '../../../core/model/account/user';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  huburl=environment.hubUrl;
  public hubConnection! :HubConnection;
  private messageThreadSource=new BehaviorSubject<Message[]>([]);
  messageThread$=this.messageThreadSource.asObservable();
  private connectionEstablished: boolean = false;
public isPopupOpen=false
  constructor(private http: HttpClient) {}

  createHubConnection(user:User,otherUsername:string){
    this.hubConnection=new HubConnectionBuilder()
    .withUrl(this.huburl+'message?user='+otherUsername,{
      accessTokenFactory:()=>user.jwt
    })
    .withAutomaticReconnect()
    .build()
    this.hubConnection.start()
    .then(() => {
      console.log('Hub connection started');
      this.connectionEstablished = true; // Mark connection as established
    }).catch(error=>console.log(error))
  this.hubConnection.on('RecieveMessageThread',messages=>{
    this.messageThreadSource.next(messages);
    this.connectionEstablished = true; // Mark connection as established

  })
  this.hubConnection.on('NewMessage',message=>{
    this.messageThread$.pipe(take(1)).subscribe(messages=>{
      this.messageThreadSource.next([...messages,message])
    })
  })
this.hubConnection.on("UpdatedGroup",(group:Group)=>{
  if(group.connections.some(x=>x.username===otherUsername)){
    this.messageThread$.pipe(take(1)).subscribe(messages=>{
      messages.forEach(message=>{
        if(!message.dateRead){
message.dateRead=new Date(Date.now())
        }
      })
      this.messageThreadSource.next([...messages]);
    })
  }
})
this.hubConnection.on('UserTyping', (userId: string) => {
  // Handle user typing event
  console.log(`User ${userId} is typing...`);
  // Emit or handle as needed in your component
});

this.hubConnection.on('UserStoppedTyping', (userId: string) => {
  // Handle user stopped typing event
  console.log(`User ${userId} stopped typing.`);
  // Emit or handle as needed in your component
});
  }
  stopHubConnection(): void {
    if (this.hubConnection && this.hubConnection.state === HubConnectionState.Connected) {
      this.hubConnection.stop().then(() => {
        console.log('Hub connection stopped successfully.');
        this.connectionEstablished = false; // Mark connection as established

      }).catch(error => {
        console.error('Error stopping hub connection:', error);
      });
    }
  }
  public isHubConnectionEstablished(): boolean {
    return this.connectionEstablished;
  }
  
  sendTypingNotification(recipientUserId: string) {
    this.hubConnection.invoke('SendTypingNotification', recipientUserId)
      .catch(err => console.error(err));
  }
  sendStoppedTypingNotification(recipientUserId: string) {
    this.hubConnection.invoke('SendStoppedTypingNotification', recipientUserId)
      .catch(err => console.error(err));
  }
 getMessages(container: string): Observable<Message[]> {
    let params = new HttpParams().set('container', container);

    return this.http.get<Message[]>(`${environment.apiUrl}Messages/get-messages-for-user`, { params });
  }
  getChats(): Observable<UserChats[]> {
    return this.http.get<UserChats[]>(`${environment.apiUrl}Messages/get-chats-for-user`);
  }
  getMessageThread(recipientId:string){
    return this.http.get<Message[]>(`${environment.apiUrl}Messages/thread/${recipientId}`)
  }
  async sendMessage(recieverId:string,Content:string){
    // return this.http.post<Message>(`${environment.apiUrl}Messages/send-message`,{RecipientId:recieverId,Content})
    return this.hubConnection.invoke('SendMessage',{RecipientId:recieverId,Content})
    .catch(error=>console.log(error));
  }
  deleteMessage(messageId:number){
return this.http.delete(`${environment.apiUrl}Messages/delete-message/${messageId}`);
  }
}
