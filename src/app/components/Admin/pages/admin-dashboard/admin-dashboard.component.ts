import { Component } from '@angular/core';
import { AdminDashboardStatistics } from '../../model/AdminDashboardStatistics';
import { AdminService } from '../../services/admin.service';
import { UserRoleStatistics } from '../../model/UserRoleStatistics';
import { Chart, registerables } from 'chart.js';
import { TopCompaniesDto } from '../../model/TopCompaniesDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  statistics!: AdminDashboardStatistics;
  userRoleStatistics!: UserRoleStatistics;
  activeChart: string = 'area'; // Default chart type
bestCompanies!:TopCompaniesDto[];
  constructor(private adminService: AdminService) {
    Chart.register(...registerables); // Register all necessary components

  }

  ngOnInit() {
    this.fetchStatistics();
    this.fetchUserRoleStatistics();
    this.fetchTopPerformingCompanies();
    
  }
ngAfterViewChecked(): void {
  this.renderDonutChart(); // Call the method to render the donut chart when the component initializes
this.renderRevenueChart();
}
  fetchStatistics() {
    this.adminService.getAdminDashboardStatistics().subscribe((data) => {
      this.statistics = data;
    });
  }
  fetchTopPerformingCompanies() {
    this.adminService.getTopPerformingCompanies().subscribe((data) => {
      console.log("Best companies: "+JSON.stringify(data) );
      
      this.bestCompanies = data;
    });
  }
  fetchUserRoleStatistics() {
    this.adminService.getUserRoleStatistics().subscribe((data) => {
      this.userRoleStatistics = data;
    });
  }
  renderDonutChart() {
    const ctx = document.getElementById('sales-chart-canvas') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [ 'Company Admins', 'Agents','Normal Users'],
        datasets: [{
          data: [
            this.userRoleStatistics.totalCompanyAdmins,
            this.userRoleStatistics.totalAgents,
            this.userRoleStatistics.totalNormalUsers
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }
  renderRevenueChart() {
    const ctx = document.getElementById('revenue-chart-canvas') as HTMLCanvasElement;
  
    if (ctx) {
      new Chart(ctx, {
        type: 'line', // Change to 'bar' or 'line' based on your preference
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'], // Example labels, adjust as needed
          datasets: [{
            label: 'Total Revenue',
            data: [1000, 1500, 2000, 2500, 3000, 3500], // Replace with actual revenue data
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            fill: true,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: true,
            }
          }
        }
      });
    } else {
      console.error("Canvas element for revenue chart not found.");
    }
  }
  

}
