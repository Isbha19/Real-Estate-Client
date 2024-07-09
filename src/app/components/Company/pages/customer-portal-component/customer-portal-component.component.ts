import { CompanyDashboardService } from '../../service/company-dashboard.service';
import { CompanyService } from './../../service/company.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-portal-component',
  standalone: true,
  imports: [],
  template: `<a style="cursor:pointer" class="ml-3" (click)="openCustomerPortal()">Manage Billing</a>`,
  styleUrl: './customer-portal-component.component.scss'
})
export class CustomerPortalComponentComponent {
  customerId:string="";
  constructor(private companyService: CompanyService,
    private companyDashboardService:CompanyDashboardService
  ) { }
ngOnInit(): void {
  console.log('Component initialized'); // Check if ngOnInit is called
  this.fetchStripeCustomerId();
}
fetchStripeCustomerId() {
  this.companyDashboardService.getStripeCustomerId().subscribe({
    next: (response) => {
this.customerId=response.stripeCustomerId ;  
    },
    error: (error) => {
      console.log(error+"errorr");
      
    }
  });
}
  openCustomerPortal() {
    this.companyService.createCustomerPortalSession(this.customerId).subscribe(response => {
      
      window.location.href = response.url;
    });
  }
}
