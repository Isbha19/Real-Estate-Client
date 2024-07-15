import { Image } from './../../../Agent/model/Image';
import { UserChats } from './../../model/userChat';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../service/message.service';
import { SignalRService } from '../../../../core/service/signal-r.service';
import { ChatPopupComponent } from '../chat-popup/chat-popup.component';
import { AccountService } from '../../../../core/service/account.service';
import { take } from 'rxjs';
import { User } from '../../../../core/model/account/user';

@Component({
  selector: 'app-members-chatted-card',
  standalone: true,
  imports: [CommonModule,ChatPopupComponent],
  templateUrl: './members-chatted-card.component.html',
  styleUrl: './members-chatted-card.component.scss'
})
export class MembersChattedCardComponent {
  sideBarOpened=false;
  chats:UserChats[]=[];
  showChat=false;
  chatUserName:string="";
  chatUserId:string="";
  chatUserImage:string=""
  user!:User;
  first=true;
  toggleSidebar(): void {
    this.sideBarOpened=!this.sideBarOpened
    if(this.sideBarOpened==true){
      this.loadMessages();
      console.log(JSON.stringify(this.chats));

    }
  }
  ngOnInit(): void {   
    
  }
constructor(private messageService:MessageService,
  public signalR:SignalRService,
  private accountService:AccountService
){

  this.accountService.user$.pipe(take(1)).subscribe((user) => {
    if (user) {
      this.user = user;
     
    }
  });
}
 
  loadMessages(){
    this.messageService.getChats().subscribe(
      (response) => {
        this.chats=response
      }
    );
   
  }
  openChat(username: string, id: string,Image:string) {
    this.messageService.isPopupOpen=true;
    if (this.showChat) {
      this.messageService.stopHubConnection();
      this.messageService.createHubConnection(this.user,id); 

    }
    this.showChat = true;
    this.chatUserName = username;
    this.chatUserId = id;
    this.chatUserImage=Image;
    
 
  }

  closeChat(){
    this.messageService.isPopupOpen=false;
    this.showChat=false;
    this.messageService.stopHubConnection();
  }
}
