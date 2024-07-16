// chat-popup.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatPopupService {
  private chatPopupState = new BehaviorSubject<{ show: boolean, name: string, id: string, image: string }>({ show: false, name: '', id: '', image: '' });

  get chatPopupState$() {
    return this.chatPopupState.asObservable();
  }

  openChat(name: string, id: string, image:string) {
    this.chatPopupState.next({ show: true, name, id, image });
  }

  closeChat() {
    this.chatPopupState.next({ show: false, name: '', id: '', image: '' });
  }
}
