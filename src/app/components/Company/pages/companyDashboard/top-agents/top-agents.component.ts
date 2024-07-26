import { CommonModule } from '@angular/common';
import { TopAgentDto } from '../../../model/TopAgentDto';
import { CompanyDashboardService } from './../../../service/company-dashboard.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-agents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-agents.component.html',
  styleUrl: './top-agents.component.scss'
})
export class TopAgentsComponent {
  topAgents: TopAgentDto[] = [];

  constructor(private companyDashboardService: CompanyDashboardService) {}

  ngOnInit(): void {
      this.getTopPerformingAgents();
  }

  getTopPerformingAgents(): void {
      this.companyDashboardService.getTopPerformingAgents().subscribe(data => {
          this.topAgents = data;
      });
  }
}
