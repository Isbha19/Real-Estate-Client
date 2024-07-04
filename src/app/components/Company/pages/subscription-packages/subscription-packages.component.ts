import { Component } from '@angular/core';

@Component({
  selector: 'app-subscription-packages',
  standalone: true,
  imports: [],
  templateUrl: './subscription-packages.component.html',
  styleUrl: './subscription-packages.component.scss'
})
export class SubscriptionPackagesComponent {
  checkOut(plan:number){
    //create subscription checkout from api
    //send plan and userId
    //res (if ok) payment
  }
}
