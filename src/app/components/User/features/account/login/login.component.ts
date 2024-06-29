import { Component, ElementRef, Inject, InjectionToken, Renderer2, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SendEmailComponent } from '../send-email/send-email.component';
import { jwtDecode } from "jwt-decode";
import { CredentialResponse } from 'google-one-tap';

import { ValidationMessagesComponent } from '../../../errors/validation-messages/validation-messages.component';
import { LoginWithExternal } from '../../../../../core/model/account/loginWithExternal';
import { AccountService } from '../../../../../core/service/account.service';

declare const FB: any;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationMessagesComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild('googleButton', { static: true }) googleButton: ElementRef =
  new ElementRef({});
  loginForm: FormGroup = new FormGroup({});
  errorMessages: string[] = [];
  submitted: boolean = false;
  resendEmail = false;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router,
    private dialog: MatDialog,
    private renderer2:Renderer2,
    @Inject(DOCUMENT) private document:Document
  ) {}


  ngOnInit(): void {
    this.initializeGoogleButton();

    this.initializeForm();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const script1=this.renderer2.createElement('script');
    script1.src='https://accounts.google.com/gsi/client';
    script1.async='true';
    script1.defer='true';
    this.renderer2.appendChild(this.document.body,script1);
  
   }
  initializeForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.dialogRef.close();

          this.toastr.success(response.message);
          
        },
        error: (error) => {
          if (error.message.includes('please confirm your email')) {
            this.resendEmail = true;
          }
        },
      });
    }
  }
  OpenSendEmailPopUp() {
    this.dialog.open(SendEmailComponent, {
      width: '40%',
      data: {
        mode: 'resend-email-confirmation-link',
      },
    });
  }
  resendEmailConfirmationLink() {
    this.OpenSendEmailPopUp();
  }
  OpenPopUp() {
    this.dialog.open(SendEmailComponent, {
      width: '30%',
      data: {
        mode: 'forgot-username-or-password',
      },
    });
  }
  loginWithFacebook() {
    FB.login(async (fbResult: any) => {
      if (fbResult.authResponse) {
        const accessToken = fbResult.authResponse.accessToken;
        const userId = fbResult.authResponse.userID;
        
        this.dialogRef.close();
        this.accountService
          .loginWithThirdParty(
            new LoginWithExternal(accessToken, userId, 'facebook')
          )
          .subscribe({
            next: (response:any) => {
          this.dialogRef.close();
            },
            error:error=>{
              const errorMessage = error.error?.message || 'An error occurred';
              this.toastr.error(errorMessage);
            }
          });
      } else {
        this.toastr.error('Unable to login with your facebook');
      }
    });
  }
  private initializeGoogleButton() {
    (window as any).onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id:
          '576596130520-rve6i5p5cvg24mfr4fa047734jv69i05.apps.googleusercontent.com',
        callback: this.googleCallBack.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      // @ts-ignore
      google.accounts.id.renderButton(this.googleButton.nativeElement, {
        size: 'medium',
        shape: 'rectangular',
        text: 'signin_with',
        logo_alignment: 'center',
        width:250
      });
    };
  }
  private async googleCallBack(response: CredentialResponse) {
const decodedToken:any=jwtDecode(response.credential);
this.dialogRef.close();

this.accountService.loginWithThirdParty(new LoginWithExternal(response.credential,decodedToken.sub,"google"))
.subscribe({
  next:_=>{
    this.toastr.success("logged in with google");
    this.router.navigateByUrl('/');
  }
 
})
  }
}



