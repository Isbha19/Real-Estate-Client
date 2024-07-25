import { AllUsers } from './../model/AllUsers';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericKeyValuePair } from '../model/genericKeyValuePair';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/model/response/ApiResponse';
import { propertyDetail } from '../../Property/model/propertyDetail';
import { CompanyProperties } from '../../Company/model/companyProperties';
import { PropertyRevenue } from '../model/propertyRevenue';


@Injectable({ providedIn: 'root' })
export class AgentPropertyService {
  constructor(private http: HttpClient) {}

  getPropertyTypes() {
    return this.http.get<GenericKeyValuePair[]>(
      `${environment.apiUrl}Property/get-property-type`
    );
  }
  getPropertiesByAgent() {
    return this.http.get<CompanyProperties[]>(
      `${environment.apiUrl}Agent/get-properties-byAgent`
    );
  }
  addProperty(property:FormData):Observable<ApiResponse> {    
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}Property/add-property`,
      property
    );
  }
  getFurnishingTypes() {
    return this.http.get<GenericKeyValuePair[]>(
      `${environment.apiUrl}Property/get-furnishing-type`
    );
  }
  getListingTypes() {
    return this.http.get<GenericKeyValuePair[]>(
      `${environment.apiUrl}Property/get-listing-type`
    );
  }
  getAmenities() {
    return this.http.get<GenericKeyValuePair[]>(
      `${environment.apiUrl}Property/get-amenities`
    );
  }
  getNearbyFacilities() {
    return this.http.get<GenericKeyValuePair[]>(
      `${environment.apiUrl}Property/get-facilities`
    );
  }
  markPropertyAsSold(requestBody:PropertyRevenue): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}Agent/mark-as-sold`,
      requestBody
    );
  }
  getAllUsers() {
    return this.http.get<AllUsers[]>(
      `${environment.apiUrl}Account/get-all-users`
    );
  }

}
