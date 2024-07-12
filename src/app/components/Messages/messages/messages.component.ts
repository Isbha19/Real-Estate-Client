import { Component } from '@angular/core';
import { Message } from '../../../core/model/message';
import { MessageService } from '../../../core/service/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})



export class MessagesComponent {
  messages!:Message[];
container='Outbox';

  
  constructor(
    private messageService:MessageService

  ) {}
  ngOnInit(): void {
   
    this.loadMessages();
  }

 
  loadMessages(){
    this.messageService.getMessages("Inbox").subscribe(
      (response) => {
      }
    );
   
  }
 
  
}

