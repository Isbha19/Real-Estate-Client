import { CapitalizePipe } from './../../../../core/pipe/capitalize.pipe';
import { MatDialog } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../features/account/login/login.component';
import { RegisterComponent } from '../../features/account/register/register.component';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../../core/service/account.service';
import { jwtDecode } from "jwt-decode";
import { JwtDecodedToken } from '../../../../core/model/jwtTokenDecoded';
import { ComponentType } from 'ngx-toastr';
import { User } from '../../../../core/model/account/user';
import { LoginResponse } from '../../../../core/model/response/LoginResponse';
import { CustomerPortalComponentComponent } from '../../../Company/pages/customer-portal-component/customer-portal-component.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink,CapitalizePipe,CustomerPortalComponentComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
constructor(private dialog:MatDialog,
  public accountService:AccountService
){}
 LoginPopUp(){
this.OpenPopUp(LoginComponent)
  }

  registerPopUp(){    
this.OpenPopUp(RegisterComponent)
  }
  OpenPopUp(Component:ComponentType<unknown>){
 this.dialog.open(Component,{
  width:'60%',
  
})
  }
  Logout(){
    this.accountService.logout();
  }
  isAdmin(user: User): boolean {
    if (user && user.jwt) {
        const decodedToken: JwtDecodedToken = jwtDecode(user.jwt);
        return decodedToken.role.includes('Admin');
    }
    return false;
}
isAgent(user:User): boolean {
  
  if (user && user.jwt) {
    
      const decodedToken: JwtDecodedToken = jwtDecode(user.jwt);
      return decodedToken.role.includes('Agent');
  }
  return false;
}
}
