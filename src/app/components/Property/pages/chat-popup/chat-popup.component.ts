import { SignalRService } from './../../../../core/service/signal-r.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-popup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat-popup.component.html',
  styleUrl: './chat-popup.component.scss'
})
export class ChatPopupComponent {
  @Input() agentName!: string;
  @Input() agentImage!: string|undefined|null;

  @Output() closeChat = new EventEmitter<void>();
  @Output() sendMessage = new EventEmitter<string>();

  newMessage: string = '';
  messages: string[] = [];

  @Input() senderId: string='821244cd-ac38-4760-aa9f-a0476dcdf65b';
  @Input() recieverId: string='ca81531a-04a6-421f-b2f2-38f00aee9308';



  constructor(private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addReceiveMessageListener();
    this.signalRService.addReceiveMessageNotificationListener();
 this.signalRService.messages.subscribe(messages => {
      this.messages = messages;
    });
  
  }

  onCloseChat() {
    this.closeChat.emit();
  }

  onSendMessage() {
    if (this.newMessage.trim() !== '') {
      this.signalRService.sendMessage(this.senderId,this.recieverId,this.newMessage);
      this.newMessage = '';
      console.log(this.messages);
      
    }
  }
}
