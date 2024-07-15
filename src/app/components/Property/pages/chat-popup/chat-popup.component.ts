import { MessageService } from './../../../Messages/service/message.service';
import { SignalRService } from './../../../../core/service/signal-r.service';
import { CommonModule } from '@angular/common';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../../../../core/model/message';
import { TimeAgoPipe } from '../../../../core/pipe/timeAgo.pipe';
import { AccountService } from '../../../../core/service/account.service';
import { User } from '../../../../core/model/account/user';
import { take } from 'rxjs';
import { JwtDecodedToken } from '../../../../core/model/jwtTokenDecoded';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-chat-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, TimeAgoPipe,PickerComponent],
  templateUrl: './chat-popup.component.html',
  styleUrl: './chat-popup.component.scss',
})
export class ChatPopupComponent {
  @ViewChild('chat') chatElement!: ElementRef;

  @Input() otherPersonName!: string;
  @Input() otherPersonImage!: string | undefined | null;
  @Input() otherPersonId!: string;


  @Output() closeChat = new EventEmitter<void>();
  @Output() sendMessage = new EventEmitter<string>();

  newMessage: string = '';
  messages: Message[] = [];
  user!: User;
  typingUsers: { [userId: string]: boolean } = {};
currentUserId:string="";
showEmoji=false;

  constructor(
    public messageService: MessageService,
    public signalR: SignalRService,
    private accountService: AccountService
  ) {
    this.accountService.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.user = user;
        const decodedToken: JwtDecodedToken = jwtDecode(user?.jwt);
        this.currentUserId=decodedToken.nameid;
      }
    });
   
  }

  ngOnInit(): void {
   if(this.messageService.isHubConnectionEstablished()==false){
    this.messageService.createHubConnection(
      this.user,
      this.otherPersonId
    );
   }
    this.messageService.hubConnection.on('UserTyping', (userId: string) => {
      this.typingUsers[userId] = true;
      
    });

    this.messageService.hubConnection.on('UserStoppedTyping', (userId: string) => {
      this.typingUsers[userId] = false;
    });
    
  }
  ngAfterViewChecked(): void {

    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.chatElement) {
      const chat = this.chatElement.nativeElement;
      chat.scrollTop = chat.scrollHeight - chat.clientHeight;
    }
  }
  onCloseChat() {
    this.closeChat.emit();
    this.messageService.stopHubConnection();
  }
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  onSendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messageService
        .sendMessage(this.otherPersonId, this.newMessage)
        .then(()=>{
          this.newMessage = '';
          this.messageService.sendStoppedTypingNotification(this.otherPersonId);
          this.showEmoji=false;

        })
    }
  }
  selectEmoji(event: any) {
    // Append selected emoji to the message
    this.newMessage += event.emoji.native;
  }
  enableEmoji(){

      this.showEmoji = !this.showEmoji;
      console.log('showEmoji:', this.showEmoji);
  }
  onTyping(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.trim() !== '') {
      this.messageService.sendTypingNotification(this.otherPersonId);
    } else {
      this.messageService.sendStoppedTypingNotification(this.otherPersonId);
    }
  }
  isUserTyping(userId: string): boolean {
    return !!this.typingUsers[userId];
  }

}
