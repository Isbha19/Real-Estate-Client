
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/model/response/ApiResponse';
import { AgentRegister } from '../model/agent/agentRegister';
import { CompanyNames } from '../model/CompanyName';
@Injectable({ providedIn: 'root' })
export class AgentService {
  constructor(private http: HttpClient) {}


  addAgent(agentData:AgentRegister) {
    const formData = new FormData();
    formData.append('UserName', agentData.UserName);
    formData.append('phoneNumber', agentData.phoneNumber.toString());
    formData.append('whatsAppNumber', agentData.whatsAppNumber.toString());
    formData.append('Nationality', agentData.Nationality);
    formData.append('LanguagesKnown', agentData.LanguagesKnown);
    formData.append('Specialization', agentData.Specialization);
    formData.append('CompanyId', agentData.CompanyId.toString());
    formData.append('About', agentData.About);
    formData.append('yearsOfExperience', agentData.yearsOfExperience.toString());
    formData.append('AgentImage', agentData.AgentImage);
 
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}Agent/add-agent`,formData
    );
  }
  getCompanyNames(){
      return this.http.get<CompanyNames[]>(
        `${environment.apiUrl}Company/get-company-names`
      );
  }
}
