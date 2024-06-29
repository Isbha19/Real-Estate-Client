import { AdminFooterComponent } from './../layout/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './../layout/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './../layout/admin-navbar/admin-navbar.component';

import { ActivatedRouteSnapshot, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { AdminService } from '../../../core/service/admin.service';
import { MemberView } from '../../../core/model/admin/memberView';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,AdminNavbarComponent,AdminSidebarComponent,AdminFooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  members:MemberView[]=[];
  constructor(private adminService:AdminService){}

ngOnInit(): void {
   //this.dynamicLoading.loadAdminAssets();
}
}