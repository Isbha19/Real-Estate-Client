import { AccountService } from './../../../../core/service/account.service';
import { Component } from '@angular/core';
import { JwtDecodedToken } from '../../../../core/model/jwtTokenDecoded';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-subscription-packages',
  standalone: true,
  imports: [],
  templateUrl: './subscription-packages.component.html',
  styleUrl: './subscription-packages.component.scss'
})
export class SubscriptionPackagesComponent {
 constructor(private accountService:AccountService){}
userEmail:string="";

ngOnInit(): void {
  this.accountService.user$.subscribe((user) => {
    if (user) {
      const decodedToken: JwtDecodedToken = jwtDecode(user?.jwt);
      this.userEmail=decodedToken.email;
    }
  });
}


 
}
