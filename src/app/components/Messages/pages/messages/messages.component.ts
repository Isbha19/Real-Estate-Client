import { Component } from '@angular/core';
import { Message } from '../../../../core/model/message';
import { MessageService } from '../../service/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TimeAgoPipe } from '../../../../core/pipe/timeAgo.pipe';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,TimeAgoPipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})



export class MessagesComponent {
  messages!:Message[];
  container='Unread';

  
  constructor(
    private messageService:MessageService

  ) {}
  ngOnInit(): void {   
    this.loadMessages();
  }

 
  loadMessages(){
    this.messageService.getMessages(this.container).subscribe(
      (response) => {
        this.messages=response
      }
    );
   
  }
 deleteMessage(id:number){
this.messageService.deleteMessage(id).subscribe(()=>{
  this.messages.splice(this.messages.findIndex(m=>m.id===id),1)
})
 }
  
}

