import { Component } from '@angular/core';
import { CompanyDetails } from '../../../../Admin/model/company/companyDetail';
import { CompanyDashboardService } from '../../../service/company-dashboard.service';
import { AgentDetails } from '../../../model/agentDetails';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-verifiedagent-list',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './verifiedagent-list.component.html',
  styleUrl: './verifiedagent-list.component.scss'
})
export class VerifiedagentListComponent {
  companies!:CompanyDetails[];
  page:number=1;
  totalLength:number=0;

constructor(private companyDashboardService:CompanyDashboardService){}
Agents!:AgentDetails[];

ngOnInit(): void { 
 this.companyDashboardService.getVerifiedAgents().subscribe({
  next: (response) => {
    console.log(JSON.stringify(response));
    
    this.Agents = response;
    this.totalLength = response.length;

  },
});
 




  
  
}

}