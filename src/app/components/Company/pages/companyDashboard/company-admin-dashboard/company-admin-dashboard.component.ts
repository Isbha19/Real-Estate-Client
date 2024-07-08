import { CompanyDBSidebarComponent } from './../company-dbsidebar/company-dbsidebar.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{CompanyDashboardNavbarComponent} from './../company-dashboard-navbar/company-dashboard-navbar.component';
import { FooterComponent } from '../../../../User/layouts/footer/footer.component';
@Component({
  selector: 'app-company-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet,CompanyDBSidebarComponent,CompanyDashboardNavbarComponent],
  templateUrl: './company-admin-dashboard.component.html',
  styleUrl: './company-admin-dashboard.component.scss'
})
export class CompanyAdminDashboardComponent {

}
