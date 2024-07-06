import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { CompanyDetails } from '../../model/company/companyDetail';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { loadcompany } from '../../../../shared/store/company/verifiedCompany/company.action';
import { companies } from '../../../../shared/store/company/verifiedCompany/company.model';
import { getCompanyList } from './../../../../shared/store/company/verifiedCompany/company.selectors';

@Component({
  selector: 'app-verified-companies',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './verified-companies.component.html',
  styleUrl: './verified-companies.component.scss'
})
export class VerifiedCompaniesComponent {
  storeNgrx = inject(Store<{ company: { company: companies } }>);
  companies!:CompanyDetails[];
  page:number=1;
  totalLength:number=0;


ngOnInit(): void {
  this.storeNgrx.dispatch(loadcompany());
  this.storeNgrx.select(getCompanyList).subscribe((item) => {
    this.companies = item;
    this.totalLength = item.length;
console.log(this.companies);
for (let index = 0; index < this.companies.length; index++) {
  const element = this.companies[index];



  
  
}

  });
}
}
