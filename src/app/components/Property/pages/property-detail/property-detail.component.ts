import { ChatPopupComponent } from './../chat-popup/chat-popup.component';
import { ImageGalleryComponent } from './../image-gallery/image-gallery.component';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';
import { propertyDetail } from '../../model/propertyDetail';
import { MatDialog } from '@angular/material/dialog';
import { SignalRService } from '../../../../core/service/signal-r.service';

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

  messages: string[] = [];
  agentId: string = 'ca81531a-04a6-421f-b2f2-38f00aee9308'; 

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private dialog:MatDialog,
    private signalRService: SignalRService // Inject SignalRService

  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const propertyId = params.get('id');
      if (propertyId) {
        const id = parseInt(propertyId, 10); // Use parseInt with radix 10 (decimal)
        this.propertyService.getPropertyById(id).subscribe({
          next: (property: propertyDetail) => {
            this.property = property;
            
            this.extractImages();

          },
          error: (err) => {
            console.error(err);
          },
        });
      }
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

}
