import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { User } from '../../../../../core/model/account/user';
import { AccountService } from '../../../../../core/service/account.service';


@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss',
})
export class SendEmailComponent {
  emailForm: FormGroup = new FormGroup({});
  submitted = false;
  mode: string | undefined;
  data = inject(MAT_DIALOG_DATA);
  dialogref = inject(MatDialogRef<SendEmailComponent>);

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          const mode = this.data.mode;
          if (mode) {
            this.mode = mode;
            this.initializeForm();
          }
        }
      },
    });
  }
  initializeForm() {
    this.emailForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            "^[A-Za-z0-9!#%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$"
          ),
        ],
      ],
    });
  }
  OpenPopUp() {
    this.dialog.open(LoginComponent, {
      width: '60%',
    });
  }
  sendEmail() {
    this.submitted = true;

    if (this.emailForm.valid && this.mode) {
      if (this.mode.includes('resend-email-confirmation-link')) {
        this.accountService
          .resendEmailConfirmation(this.emailForm.get('email')?.value)
          .subscribe({
            next: (response: any) => {
              this.toastr.success(response.message);
              this.dialogref.close();
            },
            error: (error) => {
              const errorMessage = error.error?.message || 'An error occurred';
              this.toastr.error(errorMessage);
            },
          });
      } else if (this.mode.includes('forgot-username-or-password')) {
        this.accountService
          .forgotUserNameOrPassword(this.emailForm.get('email')?.value)
          .subscribe({
            next: (response: any) => {
              this.toastr.success(response.message);
              this.dialogref.close();

            },
            error: (error) => {
              const errorMessage = error.error?.message || 'An error occurred';
              this.toastr.error(errorMessage);
            },
          });
      }
    }
  }
  cancel() {
    this.dialogref.close();
  }
}
