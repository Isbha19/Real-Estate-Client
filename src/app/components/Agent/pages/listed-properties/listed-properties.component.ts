import { SoldPropertyFormComponent } from './../sold-property-form/sold-property-form.component';
import { CommonModule, DatePipe } from '@angular/common';
import { CompanyProperties } from '../../../Company/model/companyProperties';
import { AgentPropertyService } from './../../services/agentProperty.service';
import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {PropertyRevenue} from './../../model/propertyRevenue'
@Component({
  selector: 'app-listed-properties',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule,RouterLink],
  templateUrl: './listed-properties.component.html',
  styleUrl: './listed-properties.component.scss',
  providers: [DatePipe]

})
export class ListedPropertiesComponent {
  page:number=1;
  totalLength:number=0;
  properties:CompanyProperties[]=[];
  selectedPropertyId!:number;

  constructor(private agentPropertyService:AgentPropertyService,
    private datePipe: DatePipe,
private router:Router,
private dialog: MatDialog

  ){

  }
ngOnInit(): void {
 this.loadData();
}
formatDate(date: Date | string): string {
  return this.datePipe.transform(date, 'MMM d, y, h:mm a') || '';
}
navigateToListProperty(){
this.router.navigateByUrl('list-property')
}
  loadData(){
    this.agentPropertyService.getPropertiesByAgent().subscribe({
      next: (response) => {
        this.properties=response;
        this.totalLength = response.length;
           },
    });
  }
  openSoldPropertyForm(propertyId:number){
    this.selectedPropertyId=propertyId;
    const dialogRef = this.dialog.open(SoldPropertyFormComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result:PropertyRevenue) => {
      
      result.PropertyId=this.selectedPropertyId
      this.agentPropertyService.markPropertyAsSold(result).subscribe({
        next: (response) => {
          console.log('Property marked as sold successfully', response);
          const property = this.properties.find(p => p.propertyId === this.selectedPropertyId);
          console.log("property FOUNDDD"+property);
          
          if (property) {
            property.isSold = true;
            property.revenue = result.Revenue;
            property.soldTo = result.SoldToUserId;
          }
        },error:()=>{
          console.error('Error marking property as sold');

        }
      })
   
      // if (result) {
      //   this.propertyService.markAsSold(property.id, result).subscribe(
      //     (response) => {
      //       // Update the property in the component state
      //       property.revenue = result.revenue;
      //       property.soldTo = result.soldTo;
      //       property.isSold = true;
      //     },
      //     (error) => {
      //       // Handle the error case
      //       console.error('Error updating property:', error);
      //     }
      //   );
    });
  }
}
