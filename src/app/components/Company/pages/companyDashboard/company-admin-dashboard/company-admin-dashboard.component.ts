import { CompanyDBSidebarComponent } from './../company-dbsidebar/company-dbsidebar.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-company-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet,CompanyDBSidebarComponent],
  templateUrl: './company-admin-dashboard.component.html',
  styleUrl: './company-admin-dashboard.component.scss'
})
export class CompanyAdminDashboardComponent {

}
