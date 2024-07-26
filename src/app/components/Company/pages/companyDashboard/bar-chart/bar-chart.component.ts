import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MaterialModule } from '../../../../../material.module';
import { CommonModule } from '@angular/common';
import { CompanyDashboardService } from '../../../service/company-dashboard.service';
import { PropertyStatisticsDto } from '../../../model/PropertiesStatisticsDto';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  years: number[] = [];
  selectedType: string = 'yearly';

  selectedYear: number | null = null;
  months: string[] = [];
  selectedMonth: number | null = null;
  chart: Chart | null = null;
  chartData: PropertyStatisticsDto | null = null;

  constructor(private companyDashboardService:CompanyDashboardService ) {
    Chart.register(...registerables);
   
  }
  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2018; year--) {
      this.years.push(year);
    }
    this.months = [...Array(12).keys()].map(i => new Date(0, i + 1, 0).toLocaleString('default', { month: 'long' }));

  }
  onTypeChange(type: string) {
    this.selectedType = type;
    this.selectedYear = null;
    this.selectedMonth = null;
    this.updateChart();
  }
  onYearChange(year: number) {
    this.selectedYear = year;
    this.updateChart();
  }

  onMonthChange(month: number) {
    this.selectedMonth = month;
    this.updateChart();
  }

  ngAfterViewInit(): void {
      this.updateChart();

  }
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
  updateChart(){
    console.log("type:" +this.selectedType);
    console.log("year:" +this.selectedYear);
    
    
    if (!this.selectedType) return;
    if (this.selectedType === 'monthly' && (!this.selectedYear)) {
      return; // Don't call the API if year or month is not selected
    }

    if (this.selectedType === 'daily' && (!this.selectedYear || !this.selectedMonth)) {
      return; // Don't call the API if year or month is not selected
    }

    let params = `type=${this.selectedType}`;
    if (this.selectedYear) {
      params += `&year=${this.selectedYear}`;
    }
    if (this.selectedMonth) {
      params += `&month=${this.selectedMonth}`;
    }
    this.companyDashboardService.getPropertiesStatistics(params).subscribe(data => {
      this.chartData = data;

      this.initializeBarChart(data);
    });
  }

  initializeBarChart(data: PropertyStatisticsDto): void {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (this.chart) {
        this.chart.destroy();
      }
     this.chart= new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Properties Listed',
            data: data.listedProperties,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
             
            ],
            borderColor: [
        
              'rgba(75, 192, 192, 1)',
            
            ],
            borderWidth: 1
          },
          {
            label: 'Properties sold',
            data: data.soldProperties,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
             
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Failed to get 2D context');
    }
  }
  downloadReport(): void {
    if (!this.chartData) {
      return;
    }

    const csvData = this.convertToCSV(this.chartData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'property_statistics.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  convertToCSV(data: PropertyStatisticsDto): string {
    const headers = ['Label', 'Properties Listed', 'Properties Sold'];
    const rows = data.labels.map((label, index) => [
      label,
      data.listedProperties[index],
      data.soldProperties[index]
    ]);

    let title = 'Properties Listed and Sold';
    if (this.selectedType === 'yearly' && this.selectedYear) {
      title += "for all the years";
    } else if (this.selectedType === 'monthly' && this.selectedYear) {
      title += ` for Year ${this.selectedYear}`;
    } else if (this.selectedType === 'daily' && this.selectedYear && this.selectedMonth) {
      title += ` for Year ${this.selectedYear} and Month ${this.months[this.selectedMonth - 1]}`;
    }

    const csvContent = [
      [title],
      headers,
      ...rows
    ].map(e => e.join(',')).join('\n');

    return csvContent;
  }
}
