import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Package } from '../model/package';


@Injectable({ providedIn: 'root' })
export class SubscriptionPackageService {
  constructor(private http: HttpClient) {}

 
  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(
        `${environment.apiUrl}Subscription/get-packages`
      );  }
getPackageById(id: string): Observable<Package> {
        return this.http.get<Package>(`${environment.apiUrl}Subscription/get-package/${id}`);
      }
      // this.http.post(`${environment.apiUrl}Subscription/create-product`, formValue)
    
      // });
      createPackage(formValue: Package) {
        return this.http.post(`${environment.apiUrl}Subscription/create-product`, formValue);
      }
    
}
