import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { propertyDetail } from '../../../../Property/model/propertyDetail';
import { CompanyDashboardService } from '../../../service/company-dashboard.service';
import { CompanyProperties } from '../../../model/companyProperties';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApiResponse } from '../../../../../core/model/response/ApiResponse';

@Component({
  selector: 'app-unverified-company-properties',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './unverified-company-properties.component.html',
  styleUrl: './unverified-company-properties.component.scss',
  providers: [DatePipe]

})
export class UnverifiedCompanyPropertiesComponent {
  properties!: CompanyProperties[]; // Define your company model/interface here
  page:number=1;
  totalLength:number=0;
  constructor(private companyService:CompanyDashboardService,
    private datePipe: DatePipe,
    private toastr:ToastrService

  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  formatDate(date: Date | string): string {
    return this.datePipe.transform(date, 'MMM d, y, h:mm a') || '';
  }
  verifyCompany(propertyId:number){
    this.companyService.verifyProperty(propertyId).subscribe({
      next: (response:ApiResponse) => {
        this.toastr.success(response.message);
        this.loadData();
           },
    });
  }

  loadData(){
    this.companyService.getUnverifiedCompanyProperties().subscribe({
      next: (response) => {
        console.log(response+"unverified");
        
        this.properties=response;
        this.totalLength = response.length;
           },
    });
  }
}
