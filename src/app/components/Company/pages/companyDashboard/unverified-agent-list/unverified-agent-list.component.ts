import { getUnVerifiedAgentList } from './../../../../../shared/store/agent/unVerifiedAgent/unVerifiedAgent.selector';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { unverifiedagents } from '../../../../../shared/store/agent/unVerifiedAgent/unVerifiedAgent.model';
import { AgentDetails } from '../../../model/agentDetails';
import { loadunverifiedagent, verifyagent } from '../../../../../shared/store/agent/unVerifiedAgent/unVerifiedAgent.action';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-unverified-agent-list',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './unverified-agent-list.component.html',
  styleUrl: './unverified-agent-list.component.scss'
})
export class UnverifiedAgentListComponent {
  storeNgrx = inject(Store<{ unverifiedagent: { agent: unverifiedagents } }>);
  unverifiedAgents!:AgentDetails[];
  page:number=1;
  totalLength:number=0;

ngOnInit(): void {
  this.storeNgrx.dispatch(loadunverifiedagent());
  this.storeNgrx.select(getUnVerifiedAgentList).subscribe((item) => {
    this.unverifiedAgents = item;
    this.totalLength = item.length;
console.log(this.unverifiedAgents);

  });
}
verifyCompany(agentId:number){
  this.storeNgrx.dispatch(verifyagent({ agentId: agentId }));
}
}
