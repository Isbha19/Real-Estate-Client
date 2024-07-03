import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { take } from 'rxjs';
import { ComponentType, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { SendEmailComponent } from '../send-email/send-email.component';
import { ConfirmEmail } from '../../../../../core/model/account/confirmEmail';
import { User } from '../../../../../core/model/account/user';
import { AccountService } from '../../../../../core/service/account.service';
import { ApiResponse } from '../../../../../core/model/response/ApiResponse';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent {
  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private dialog:MatDialog
  ) {}
  success: boolean = true;

  ngOnInit(): void {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: { get: (arg0: string) => string | null; }) => {
              const confirmEmail: ConfirmEmail = {
                token: params.get('token')??"",
                email: params.get('email')??"",
              };
              this.accountService.ConfirmEmail(confirmEmail).subscribe({
                next: (response: ApiResponse) => {
                  this.toastr.success(response.message);
                },
                error: (error) => {
                  const errorMessage =
                    error.error?.message || 'An error occurred';
                  this.success = false;
                  this.toastr.error(errorMessage);
                },
              });
            },
          });
        }
      },
    });
  }

  LoginPopUp(){
    this.OpenPopUp(LoginComponent,'60%')
      }
    
    
      OpenPopUp(Component:ComponentType<unknown>,width:string,mode=""){
     this.dialog.open(Component,{
      width:width,
      data:{
        mode:mode
      }
      
    })}
    resendEmailConfirmationLink(){
      this.OpenPopUp(SendEmailComponent,'40%','resend-email-confirmation-link');
    }
}
