import { Component } from '@angular/core';
import { CompanyProperties } from '../../../model/companyProperties';
import { CompanyDashboardService } from '../../../service/company-dashboard.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-company-properties',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './company-properties.component.html',
  styleUrl: './company-properties.component.scss',
  providers: [DatePipe]

})
export class CompanyPropertiesComponent {
  properties!: CompanyProperties[]; // Define your company model/interface here
  page:number=1;
  totalLength:number=0;
  constructor(private companyService:CompanyDashboardService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  formatDate(date: Date | string): string {
    return this.datePipe.transform(date, 'MMM d, y, h:mm a') || '';
  }
  loadData(){
    this.companyService.getCompanyProperties().subscribe({
      next: (response) => {
        this.properties=response;
        this.totalLength = response.length;
           },
    });
  }
}
