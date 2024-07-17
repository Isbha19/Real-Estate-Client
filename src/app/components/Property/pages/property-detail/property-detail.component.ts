import { ChatPopupComponent } from './../../../Messages/pages/chat-popup/chat-popup.component';
import { ImageGalleryComponent } from './../image-gallery/image-gallery.component';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';
import { propertyDetail } from '../../model/propertyDetail';
import { MatDialog } from '@angular/material/dialog';
import { SignalRService } from '../../../../core/service/signal-r.service';
import { AccountService } from '../../../../core/service/account.service';
import { take, takeUntil } from 'rxjs/operators';
import { User } from '../../../../core/model/account/user';
import { JwtDecodedToken } from '../../../../core/model/jwtTokenDecoded';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Subject } from 'rxjs';


@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule,ChatPopupComponent],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss',
})
export class PropertyDetailComponent {
  property!: propertyDetail;
  primaryImageUrl: string | undefined;
  otherImageUrls: string[] = [];
  isOpen = false;
  showChat = false;
  notSameUser=true;
  messages: string[] = [];
  user!:User;
userId!:string;
private subscriptions: Subscription[] = []; // Array to hold all subscriptions
  private ngUnsubscribe: Subject<void> = new Subject<void>(); // Subject to trigger unsubscribe

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private dialog:MatDialog,
    private signalRService: SignalRService,
    private accountService:AccountService,
    private toastr:ToastrService

  ) {
    this.accountService.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.user = user;
        const decodedToken: JwtDecodedToken = jwtDecode(user?.jwt);
        this.userId=decodedToken.nameid;
      }
    });
  }
  ngOnInit(): void {
    const routeSubscription = this.route.paramMap.subscribe((params) => {
      const propertyId = params.get('id');
      if (propertyId) {
        const id = parseInt(propertyId, 10); // Use parseInt with radix 10 (decimal)
        const propertySubscription =this.propertyService.getPropertyById(id).subscribe({
          next: (property: propertyDetail) => {
            this.property = property;
            
            this.extractImages();

          },
          error: (err) => {
            console.error(err);
          },
        });
        this.subscriptions.push(propertySubscription); // Store subscription in array

      }
    });
    this.subscriptions.push(routeSubscription); // Store subscription in array

  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    // Unsubscribe from all subscriptions
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  private extractImages(): void {    
    if (this.property.images && this.property.images.length > 0) {

      const primaryImage = this.property.images.find(image => image.isPrimary);
      if (primaryImage) {
        
        this.primaryImageUrl = primaryImage.imageUrl;
      }
      if(this.otherImageUrls.length<=4){
        
      this.otherImageUrls = this.property.images
      .filter(image => !image.isPrimary)
      .map(image => image.imageUrl);
      }
    }
  }

  OpenGallery(){
    this.dialog.open(ImageGalleryComponent,{
     width:'70%',
     data: { imageUrls: this.otherImageUrls }

   })
}
openChat() {
  this.showChat = true;
  // Load previous messages if needed
}

closeChat() {
  this.showChat = false;
}
IsSameUser(){
if(this.userId==this.property.agentUserId){
  this.notSameUser=false;
this.toastr.warning("You can't chat with yourself");
}
}
}
