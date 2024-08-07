import { GenericKeyValuePair } from './../../Agent/model/genericKeyValuePair';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { companyRegister } from '../model/companyRegister';
import { Observable } from 'rxjs';
import { CompanyRegisterResponse } from '../model/companyRegisterResponse';
import { ApiResponse } from '../../../core/model/response/ApiResponse';
import { CompanyDetails } from '../../Admin/model/company/companyDetail';
import { CustomerPortalSessionResponse } from '../model/CustomerPortal';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(private http: HttpClient) {}

  addCompany(company:companyRegister) {        
    return this.http.post<CompanyRegisterResponse>(
      `${environment.apiUrl}Company/add-company`,
      company
    );
  }
  getCompanyStructures() {
    return this.http.get<GenericKeyValuePair[]>(
      `${environment.apiUrl}Company/get-company-structures`
    );
  }
  getBusinessActivityTypes() {
    return this.http.get<GenericKeyValuePair[]>(
      `${environment.apiUrl}Company/get-business-activity-types`
    );
  }
  uploadCompanyLogo(file: File, companyId: number): Observable<ApiResponse> {    
    const formData = new FormData();
    formData.append('file', file);
    const headers=new HttpHeaders().append('Content-Disposition','multipart/form-data')

    return this.http.post<ApiResponse>(`${environment.apiUrl}Company/add-company-logo?companyId=${companyId}`, formData);
  }
  
  createCustomerPortalSession(customerId: string): Observable<CustomerPortalSessionResponse> {    
    return this.http.post<CustomerPortalSessionResponse>(`${environment.apiUrl}Company/create-customer-portal-session/${customerId}`,{});
  }
  validateUserPayment(){
    return this.http.get<ApiResponse>(
      `${environment.apiUrl}Company/validate-user-for-payment`
    );
  }
  getCompanyDetails(){
    return this.http.get<CompanyDetails>(
      `${environment.apiUrl}Company/Get-company-by-User`
    );
  }
}
