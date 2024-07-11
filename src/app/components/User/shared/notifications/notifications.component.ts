import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { NotificationService } from '../../../../core/service/notification.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationDisplay } from '../../../../core/model/notification/notificationDisplay';
import { TimeAgoPipe } from '../../../../core/pipe/timeAgo.pipe';
import { AccountService } from '../../../../core/service/account.service';
import { JwtDecodedToken } from '../../../../core/model/jwtTokenDecoded';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterLink, TimeAgoPipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  notifications: NotificationDisplay[] = [];
  userId!: string; // Initialize userId
  NotificationsToOpenCount:number=0;
  
  constructor(
    public notificationService: NotificationService,

  ) {}
  ngOnInit(): void {
    this.loadNotifications();
    this.updateOpenedNotificationsCount();
  }

  loadNotifications() {
    this.notificationService.getUserNotifications().subscribe(
      (notifications) => {
        this.notifications = notifications;
        console.log(this.NotificationsToOpenCount);

      }
    );
  }
  markAsRead(notificationId:number) {
this.notificationService.markNotificationsAsRead(notificationId).subscribe(
  () => {
    this.updateOpenedNotificationsCount();
    this.loadNotifications();

  }
);
  }
  markOpen(){    
    this.notificationService.markNotificationsAsOpened().subscribe(
      () => {
        this.updateOpenedNotificationsCount();
      }
    );
  }
  updateOpenedNotificationsCount(){
this.notificationService.getUnopenedCount().subscribe(
  (result:number)=>{
    this.NotificationsToOpenCount=result;
  }
)
  }
}
