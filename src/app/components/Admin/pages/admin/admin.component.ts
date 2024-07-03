import { AdminFooterComponent } from './../layout/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './../layout/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './../layout/admin-navbar/admin-navbar.component';

import { ActivatedRouteSnapshot, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { MemberView } from '../../model/memberView';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,AdminNavbarComponent,AdminSidebarComponent,AdminFooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}