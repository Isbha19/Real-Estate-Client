import { PropertyCard } from './../model/property/propertyCard';
import { GenericKeyValuePair } from './../model/property/genericKeyValuePair';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberView } from '../model/admin/memberView';
import { environment } from '../../../environments/environment';
import { MemberAddEdit } from '../model/admin/memberAddEdit';
import { propertyDetail } from '../model/property/propertyDetail';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  constructor(private http: HttpClient) {}

  getPropertyTypes() {
    return this.http.get<GenericKeyValuePair[]>(
      `${environment.apiUrl}Property/get-property-type`
    );
  }
  getPropertiesBasedonListType(listingType:string){
    return this.http.get<PropertyCard[]>(
      `${environment.apiUrl}Property/get-properties/${listingType}`
    );
  }
  getPropertyById(id:number){
    return this.http.get<propertyDetail>(
      `${environment.apiUrl}Property/get-property/${id}`
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
