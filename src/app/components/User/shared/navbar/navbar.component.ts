import { MatDialog } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../features/account/login/login.component';
import { RegisterComponent } from '../../features/account/register/register.component';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../../core/service/account.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
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
  OpenPopUp(Component:any){
 this.dialog.open(Component,{
  width:'60%',
  
})
  }
  Logout(){
    this.accountService.logout();
  }
  isAdmin(user: any): boolean {
    if (user && user.data.jwt) {
        const decodedToken: any = jwtDecode(user.data.jwt);
        return decodedToken.role.includes('Admin');
    }
    return false;
}

}
