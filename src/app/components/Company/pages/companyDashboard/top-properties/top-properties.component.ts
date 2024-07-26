import { CompanyDashboardService } from './../../../service/company-dashboard.service';
import { Component } from '@angular/core';
import { TopPropertyDto } from '../../../model/TopPropertyDto';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-properties',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './top-properties.component.html',
  styleUrl: './top-properties.component.scss'
})
export class TopPropertiesComponent {
  topProperties: TopPropertyDto[] = [];

  constructor(private companyDashboardService: CompanyDashboardService) { }

  ngOnInit(): void {
    this.fetchTopProperties();
  }

  fetchTopProperties(): void {
    this.companyDashboardService.getTopProperties().subscribe(data => {
      console.log("data: "+JSON.stringify(data));
      
      this.topProperties = data;
    });
  }
}
