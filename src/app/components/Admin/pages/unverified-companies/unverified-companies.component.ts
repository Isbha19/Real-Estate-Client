import { getUnVerifiedCompanyList } from './../../../../shared/store/company/unVerifiedCompany/unVerifiedCompany.selectors';
import { Component, inject } from '@angular/core';
import { CompanyDetails } from '../../model/company/companyDetail';
import { Store } from '@ngrx/store';
import { loadunverifiedcompany } from '../../../../shared/store/company/unVerifiedCompany/unVerifiedCompany.action';
import { unverifiedcompanies } from '../../../../shared/store/company/unVerifiedCompany/unVerifiedCompany.model';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-unverified-companies',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './unverified-companies.component.html',
  styleUrl: './unverified-companies.component.scss'
})
export class UnverifiedCompaniesComponent {
  storeNgrx = inject(Store<{ unverifiedcompany: { user: unverifiedcompanies } }>);
  unverifiedCompanies!:CompanyDetails[];
  page:number=1;
  totalLength:number=0;


ngOnInit(): void {
  this.storeNgrx.dispatch(loadunverifiedcompany());
  this.storeNgrx.select(getUnVerifiedCompanyList).subscribe((item) => {
    this.unverifiedCompanies = item;
    this.totalLength = item.length;

  });
}
}