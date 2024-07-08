import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../service/company.service';

@Component({
  selector: 'app-company-dashboard-navbar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './company-dashboard-navbar.component.html',
  styleUrl: './company-dashboard-navbar.component.scss'
})
export class CompanyDashboardNavbarComponent {
constructor(private companyService:CompanyService){}
  ngOnInit(): void {
    this.loadData();
  }
  companyName!:string;
  companyLogoUrl!:string;

  loadData(){
    this.companyService.getCompanyDetails().subscribe({
      next: (response) => {
        this.companyName=response.companyName;
        this.companyLogoUrl=response.companyLogo;        },
    });
  }
  
}
