import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MaterialModule } from '../../../../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  years: number[] = [];
  selectedYear: number | null = null;

  constructor() {
    Chart.register(...registerables);
   
  }
  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2018; year--) {
      this.years.push(year);
    }
    
  }
  onYearChange(year: number) {
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeBarChart();
    });

  }

  initializeBarChart(): void {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Properties Listed',
            data: [65, 59, 80, 81, 56, 55, 40],
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
            data: [65, 59, 80, 81, 56, 55, 40],
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
}
