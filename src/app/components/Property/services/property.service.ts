import { propertyDetail } from './../model/propertyDetail';
import { PropertyFilter } from './../model/propertyFilter';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PropertyListing } from '../model/propertyList';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  constructor(private http: HttpClient) {}

  
  getPropertiesBasedonListType(listingType:string){
    return this.http.get<PropertyListing[]>(
      `${environment.apiUrl}Property/get-properties/${listingType}`
    );
  }
  getPropertyById(id:number){
    return this.http.get<propertyDetail>(
      `${environment.apiUrl}Property/get-property/${id}`
    );
  }
  getFilteredProperties(filters: PropertyFilter) {
    console.log("came hre servicee"+ JSON.stringify(filters));
    
    return this.http.post<any>(`${environment.apiUrl}Property/filter-properties`, filters);
  }

}
