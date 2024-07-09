import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomerPortalComponentComponent } from '../../customer-portal-component/customer-portal-component.component';

@Component({
  selector: 'app-company-dbsidebar',
  standalone: true,
  imports: [RouterLink,CustomerPortalComponentComponent],
  templateUrl: './company-dbsidebar.component.html',
  styleUrl: './company-dbsidebar.component.scss'
})
export class CompanyDBSidebarComponent {

}
