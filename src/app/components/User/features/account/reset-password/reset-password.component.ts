import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ResetPassword } from '../../../../../core/model/account/resetPassword';
import { User } from '../../../../../core/model/account/user';
import { AccountService } from '../../../../../core/service/account.service';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup = new FormGroup({});
  token: string | undefined;
  email: string | undefined;
  submitted = false;
  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              this.token = params.get('token');
              this.email = params.get('email');
              if (this.token && this.email) {
                this.initializaForm(this.email);
              } else {
                this.router.navigateByUrl('/');
              }
            },
          });
        }
      },
    });
  }

  initializaForm(username: string) {
    this.resetPasswordForm = this.formBuilder.group({
      email: [
        {
          value: username,
          disabled: true,
        },
      ],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }
  resetPassword() {
    this.submitted = true;
    if (this.resetPasswordForm.valid && this.email && this.token) {
      const model: ResetPassword = {
        token: this.token,
        email: this.email,
        newPassword: this.resetPasswordForm.get('newPassword')?.value,
      };
      this.accountService.resetPassword(model).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message);
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'An error occurred';
          this.toastr.error(errorMessage);
        },
      });
    }
  }
}
