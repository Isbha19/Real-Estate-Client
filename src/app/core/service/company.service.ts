import { PropertyCard } from './../model/property/propertyCard';
import { GenericKeyValuePair } from './../model/property/genericKeyValuePair';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberView } from '../model/admin/memberView';
import { environment } from '../../../environments/environment';
import { MemberAddEdit } from '../model/admin/memberAddEdit';
import { propertyDetail } from '../model/property/propertyDetail';
import { companyRegister } from '../model/company/companyRegister';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(private http: HttpClient) {}

  addCompany(company:companyRegister) {  
    console.log("companyService worked");
      
    return this.http.post(
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
  uploadCompanyLogo(file: File, companyId: number): Observable<any> {
    console.log("uploasdd");
    
    const formData = new FormData();
    formData.append('file', file);
    const headers=new HttpHeaders().append('Content-Disposition','multipart/form-data')

    return this.http.post<any>(`${environment.apiUrl}Company/add-company-logo?companyId=${companyId}`, formData);
  }

}
