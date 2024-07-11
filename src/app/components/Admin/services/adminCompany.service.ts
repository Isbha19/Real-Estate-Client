import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CompanyDetails } from '../model/company/companyDetail';

@Injectable({ providedIn: 'root' })
export class AdminCompanyService {
  constructor(private http: HttpClient) {}

  getVerifiedCompanies() {
    return this.http.get<CompanyDetails[]>(
      `${environment.apiUrl}Company/get-verified-companies-details`
    );
  }
  getUnVerifiedCompanies() {
    return this.http.get<CompanyDetails[]>(
      `${environment.apiUrl}Company/get-unverified-companies-details`
    );
  }
  verifyCompany(companyId: number) {
    return this.http.post(
      `${environment.apiUrl}Company/verify/${companyId}`,
      {}
    );
  }
}
