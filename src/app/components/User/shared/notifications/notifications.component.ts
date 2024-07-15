import { AccountService } from './../../../../core/service/account.service';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { NotificationService } from '../../../../core/service/notification.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationDisplay } from '../../../../core/model/notification/notificationDisplay';
import { TimeAgoPipe } from '../../../../core/pipe/timeAgo.pipe';
import { JwtDecodedToken } from '../../../../core/model/jwtTokenDecoded';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../../core/model/account/user';
import { take } from 'rxjs';

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
  user!:User;
  constructor(
    public notificationService: NotificationService,
private accountService:AccountService
  ) {
    this.accountService.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }
  ngOnInit(): void {
    //this.loadNotifications();
    this.updateOpenedNotificationsCount();
    this.notificationService.createHubConnection(
      this.user,
      
    );
    this.notificationService.hubConnection.on('ReceiveNotification', (data: any) => {
      
    });
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
      this.updateOpenedNotificationsCount();
    });
  }

  loadNotifications() {
    this.notificationService.getUserNotifications().subscribe(
      (notifications) => {
        this.notifications = notifications;

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
