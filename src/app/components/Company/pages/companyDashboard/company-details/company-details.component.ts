import { Component } from '@angular/core';
import { CompanyService } from '../../../service/company.service';
import { CompanyDetails } from '../../../../Admin/model/company/companyDetail';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss'
})
export class CompanyDetailsComponent {
  company!: CompanyDetails; // Define your company model/interface here

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    // Fetch company details using a service method
    this.companyService.getCompanyDetails().subscribe(
      (data) => {
        this.company = data; // Assign fetched company data to 'company'
      },
      (error) => {
        console.error('Error fetching company details:', error);
      }
    );
  }
}
