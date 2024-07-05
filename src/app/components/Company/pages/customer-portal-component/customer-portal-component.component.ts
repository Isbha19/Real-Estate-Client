import { CompanyService } from './../../service/company.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-portal-component',
  standalone: true,
  imports: [],
  template: `<a (click)="openCustomerPortal()" class="nav-item nav-link">Customer Portal</a>`,
  styleUrl: './customer-portal-component.component.scss'
})
export class CustomerPortalComponentComponent {
  constructor(private companyService: CompanyService) { }

  openCustomerPortal() {
    const customerId = 'cus_QPvq3N0nkaI28D'; // Retrieve the Stripe customer ID for the logged-in user

    this.companyService.createCustomerPortalSession(customerId).subscribe(response => {
      window.location.href = response.url;
    });
  }
}
