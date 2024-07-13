import { SignalRService } from './../../../../core/service/signal-r.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../../core/service/message.service';
import { Message } from '../../../../core/model/message';
import { TimeAgoPipe } from '../../../../core/pipe/timeAgo.pipe';
import { AccountService } from '../../../../core/service/account.service';
import { User } from '../../../../core/model/account/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-chat-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, TimeAgoPipe],
  templateUrl: './chat-popup.component.html',
  styleUrl: './chat-popup.component.scss',
})
export class ChatPopupComponent {
  @ViewChild('chat') chatElement!: ElementRef;

  @Input() agentName!: string;
  @Input() agentImage!: string | undefined | null;

  @Output() closeChat = new EventEmitter<void>();
  @Output() sendMessage = new EventEmitter<string>();

  newMessage: string = '';
  messages: Message[] = [];
  user!: User;
  // @Input() senderId: string='821244cd-ac38-4760-aa9f-a0476dcdf65b';
  // @Input() recieverId: string='ca81531a-04a6-421f-b2f2-38f00aee9308';

  constructor(
    public messageService: MessageService,
    public signalR: SignalRService,
    private accountService: AccountService
  ) {
    this.accountService.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }
  // loadMessages() {
  //   this.messageService
  //     .getMessageThread('ca81531a-04a6-421f-b2f2-38f00aee9308')
  //     .subscribe((messages) => {
  //       this.messages = messages;
  //       console.log(JSON.stringify(this.messages) + 'ms');
  //     });
  // }
  ngOnInit(): void {
    // this.loadMessages();
    this.messageService.createHubConnection(
      this.user,
      'ca81531a-04a6-421f-b2f2-38f00aee9308'
    );
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
        .sendMessage('ca81531a-04a6-421f-b2f2-38f00aee9308', this.newMessage)
        .then(()=>{
          this.newMessage = '';

        })
    }
  }
}
