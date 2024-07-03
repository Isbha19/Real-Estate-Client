import { propertyDetail } from './../model/propertyDetail';
import { PropertyCard } from './../../Agent/model/propertyCard';

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

}
