import { SubscriptionPackage } from './../../../model/SubscriptionPackage';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../service/company.service';
import { CompanyDashboardService } from '../../../service/company-dashboard.service';

@Component({
  selector: 'app-company-dashboard-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-dashboard-navbar.component.html',
  styleUrl: './company-dashboard-navbar.component.scss',
})
export class CompanyDashboardNavbarComponent {
  constructor(
    private companyService: CompanyService,
    private companyDashboardService: CompanyDashboardService
  ) {}
  ngOnInit(): void {
    this.loadData();
    this.loadPackage();
  }
  companyName!: string;
  companyLogoUrl!: string;
  SubscriptionPackage!: SubscriptionPackage;
  loadData() {
    this.companyService.getCompanyDetails().subscribe({
      next: (response) => {
        this.companyName = response.companyName;
        this.companyLogoUrl = response.companyLogo;
      },
    });
  }
  loadPackage() {
    this.companyDashboardService.getSubscriptionPackage().subscribe({
      next: (response) => {
        this.SubscriptionPackage = response;
      },
    });
  }
}
