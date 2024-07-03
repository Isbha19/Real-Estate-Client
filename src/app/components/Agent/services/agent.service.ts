import { Property } from './../model/property';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericKeyValuePair } from '../model/genericKeyValuePair';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/model/response/ApiResponse';


@Injectable({ providedIn: 'root' })
export class AgentService {
  constructor(private http: HttpClient) {}

  getPropertyTypes() {
    return this.http.get<GenericKeyValuePair[]>(
      `${environment.apiUrl}Property/get-property-type`
    );
  }

  addProperty(property:Property):Observable<ApiResponse> {
    console.log(property);
    
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

}
