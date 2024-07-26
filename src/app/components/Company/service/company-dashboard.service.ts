import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';


import { AgentDetails } from '../model/agentDetails';
import {CompanyProperties} from '../model/companyProperties';
import { propertyDetail } from '../../Property/model/propertyDetail';
import { SubscriptionPackage } from '../model/SubscriptionPackage';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/model/response/ApiResponse';
import { companyStripeCustomer } from '../model/CompanyStripeCustomer';
import { DashboardStatistics } from '../model/dashboardStatitics';
import { PropertyStatisticsDto } from '../model/PropertiesStatisticsDto';
import { TopPropertyDto } from '../model/TopPropertyDto';
import { TopAgentDto } from '../model/TopAgentDto';
@Injectable({ providedIn: 'root' })
export class CompanyDashboardService {
  constructor(private http: HttpClient) {}

  getUnVerifiedAgents() {
    return this.http.get<AgentDetails[]>(
      `${environment.apiUrl}Agent/get-unverified-agents-details`
    );
  }
  getVerifiedAgents() {
    return this.http.get<AgentDetails[]>(
      `${environment.apiUrl}Agent/get-verified-agents-details`
    );
  }
  getCompanyProperties() {
    return this.http.get<CompanyProperties[]>(
      `${environment.apiUrl}Property/get-company-properties`
    );
  }
  getCompanyStatistics() {
    return this.http.get<DashboardStatistics>(
      `${environment.apiUrl}Company/Get-companyDashboard-statistics`
    );
  }
  getUnverifiedCompanyProperties() {
    return this.http.get<CompanyProperties[]>(
      `${environment.apiUrl}Property/get-unverified-company-properties`
    );
  }
  verifyAgent(agentId: number) {
    return this.http.post(
      `${environment.apiUrl}Agent/verify/${agentId}`,
      {}
    );
  }
  verifyProperty(propertyId: number):Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}Property/verify/${propertyId}`,
      {}
    );
  }
  getStripeCustomerId() {
    return this.http.get<companyStripeCustomer>(
      `${environment.apiUrl}Company/get-stripe-customerId`
    );
  }
  getSubscriptionPackage() {
    return this.http.get<SubscriptionPackage>(
      `${environment.apiUrl}Company/get-subscription-package`
    );
  }
  getPropertiesStatistics(params: string): Observable<PropertyStatisticsDto> {
    return this.http.get<PropertyStatisticsDto>(`${environment.apiUrl}Property/properties/statistics?${params}`);
  }
  getTopProperties(): Observable<TopPropertyDto[]> {
    return this.http.get<TopPropertyDto[]>(`${environment.apiUrl}Property/top-properties`);
  }
  getTopPerformingAgents(): Observable<TopAgentDto[]> {
    return this.http.get<TopAgentDto[]>(`${environment.apiUrl}Agent/top-agents`);
}
}
