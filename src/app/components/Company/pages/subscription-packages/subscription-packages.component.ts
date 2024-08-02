import { SubscriptionPackageService } from './../../../Subscriptions/services/subscriptionPackage.service';
import { AccountService } from './../../../../core/service/account.service';
import { Component } from '@angular/core';
import { JwtDecodedToken } from '../../../../core/model/jwtTokenDecoded';
import { jwtDecode } from 'jwt-decode';
import { CompanyService } from '../../service/company.service';
import { Package } from '../../../Subscriptions/model/package';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription-packages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-packages.component.html',
  styleUrl: './subscription-packages.component.scss'
})
export class SubscriptionPackagesComponent {
 constructor(private accountService:AccountService,
  private companyService:CompanyService,
  private subscriptionPackageService:SubscriptionPackageService
 ){}
userEmail:string="";
packages: Package[] = [];

ngOnInit(): void {
  this.accountService.user$.subscribe((user) => {
    if (user) {
      const decodedToken: JwtDecodedToken = jwtDecode(user?.jwt);
      this.userEmail=decodedToken.email;
    }
  });

  this.subscriptionPackageService.getPackages().subscribe((data: Package[])=>{
this.packages=data;
  })
}
validateAndProceedToPayment(paymentUrl: string) {

  this.companyService.validateUserPayment().subscribe({
    next: (response) => {
      window.location.href=paymentUrl+`?prefilled_email=${this.userEmail}&prefilled_email_readonly=true`;
    },
  });

 
}
}