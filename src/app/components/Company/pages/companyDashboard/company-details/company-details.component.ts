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
    this.loadData();
  }
  loadData(){
    this.companyService.getCompanyDetails().subscribe({
      next: (response) => {
        this.company=response;
           },
    });
  }
}
