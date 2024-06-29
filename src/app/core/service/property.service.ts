import { GenericKeyValuePair } from './../model/property/genericKeyValuePair';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberView } from '../model/admin/memberView';
import { environment } from '../../../environments/environment';
import { MemberAddEdit } from '../model/admin/memberAddEdit';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  constructor(private http: HttpClient) {}

  getPropertyTypes() {
    return this.http.get<GenericKeyValuePair[]>(
      `${environment.apiUrl}Property/get-property-type`
    );
  }
  addProperty(property:any) {
    console.log(property);
    
    return this.http.post(
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
