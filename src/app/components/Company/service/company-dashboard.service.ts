import { GenericKeyValuePair } from './../../Agent/model/genericKeyValuePair';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { companyRegister } from '../model/companyRegister';
import { Observable } from 'rxjs';
import { CompanyRegisterResponse } from '../model/companyRegisterResponse';
import { ApiResponse } from '../../../core/model/response/ApiResponse';
import { CompanyDetails } from '../../Admin/model/company/companyDetail';
import { AgentDetails } from '../model/agentDetails';

@Injectable({ providedIn: 'root' })
export class CompanyDashboardService {
  constructor(private http: HttpClient) {}

  getUnVerifiedAgents() {
    return this.http.get<AgentDetails[]>(
      `${environment.apiUrl}Agent/get-unverified-agents-details`
    );
  }
  verifyAgent(agentId: number) {
    return this.http.post(
      `${environment.apiUrl}Agent/verify/${agentId}`,
      {}
    );
  }
}
