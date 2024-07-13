import { Group } from './../model/group';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, take } from 'rxjs';
import { Message } from '../model/message';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../model/account/user';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  huburl=environment.hubUrl;
  private hubConnection! :HubConnection;
  private messageThreadSource=new BehaviorSubject<Message[]>([]);
  messageThread$=this.messageThreadSource.asObservable();
  
  constructor(private http: HttpClient) {}

  createHubConnection(user:User,otherUsername:string){
    this.hubConnection=new HubConnectionBuilder()
    .withUrl(this.huburl+'message?user='+otherUsername,{
      accessTokenFactory:()=>user.jwt
    })
    .withAutomaticReconnect()
    .build()
    this.hubConnection.start().catch(error=>console.log(error))
  this.hubConnection.on('RecieveMessageThread',messages=>{
    this.messageThreadSource.next(messages);
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
  }
  stopHubConnection(){
    if(this.hubConnection){
      this.hubConnection.stop();
    }
  }
 getMessages(container: string): Observable<Message[]> {
    let params = new HttpParams().set('container', container);

    return this.http.get<Message[]>(`${environment.apiUrl}Messages/get-messages-for-user`, { params });
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
