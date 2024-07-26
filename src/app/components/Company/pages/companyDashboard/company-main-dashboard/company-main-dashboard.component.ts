import { BarChartComponent } from './../bar-chart/bar-chart.component';
import { CompanyDashboardService } from '../../../service/company-dashboard.service';
import { DashboardStatistics } from './../../../model/dashboardStatitics';
import { Component } from '@angular/core';
import { TopPropertiesComponent } from '../top-properties/top-properties.component';
import { TopAgentsComponent } from '../top-agents/top-agents.component';

@Component({
  selector: 'app-company-main-dashboard',
  standalone: true,
  imports: [BarChartComponent,TopPropertiesComponent,TopAgentsComponent],
  templateUrl: './company-main-dashboard.component.html',
  styleUrl: './company-main-dashboard.component.scss',
})
export class CompanyMainDashboardComponent {
  progressWidth: number = 0; // Progress bar width based on percentage
  constructor(private companyDashboardService: CompanyDashboardService) {}
  statistics!: DashboardStatistics;
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.companyDashboardService.getCompanyStatistics().subscribe({
      next: (response) => {
        this.statistics = response;
      },
    });
  }
ngAfterViewInit(): void {
  this.updateProgressBar();

}
  updateProgressBar() {
    console.log("update progress bar");
    
    this.progressWidth =
      (this.statistics.propertiesUsed / this.statistics.propertyLimit) * 100;
      console.log(this.progressWidth+"progress width");
      
  }
  
}
