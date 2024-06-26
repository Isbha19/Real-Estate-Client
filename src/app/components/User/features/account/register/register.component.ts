import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../../account/login/login.component';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { jwtDecode } from "jwt-decode";
import { ValidationMessagesComponent } from '../../../errors/validation-messages/validation-messages.component';
import { AccountService } from '../../../../../core/service/account.service';
declare const FB: any;
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationMessagesComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @ViewChild('googleButton', { static: true }) googleButton: ElementRef =
    new ElementRef({});
  registerForm: FormGroup = new FormGroup({});
  errorMessages: string[] = [];
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private dialog: MatDialog,
    private router: Router,
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
    this.registerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern("^[-'a-zA-Z]+$"),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern("^[-'a-zA-Z]+$"),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            "^[A-Za-z0-9!#%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$"
          ),
        ],
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }
  register() {
    this.submitted = true;
    this.errorMessages = [];
    if (this.registerForm.valid) {
      this.accountService.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message);
          this.dialogRef.close();
          this.dialog.open(LoginComponent, { width: '60%' });
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'An error occurred';
          this.toastr.error(errorMessage);
        },
      });
    }
  }
  registerWithFacebook() {
    FB.login(async (fbResult: any) => {
      if (fbResult.authResponse) {
        const accessToken = fbResult.authResponse.accessToken;
        const userId = fbResult.authResponse.userID;
        this.dialogRef.close();

        this.router.navigateByUrl(
          `/register/third-party/facebook?access_token=${accessToken}&userId=${userId}`
        );
      } else {
        this.toastr.error('Unable to register with your facebook');
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
        text: 'signup_with',
        logo_alignment: 'center',
        width:250
      });
    };
  }
  private async googleCallBack(response: CredentialResponse) {
const decodedToken:any=jwtDecode(response.credential);
this.dialogRef.close();

this.router.navigateByUrl(
  `/register/third-party/google?access_token=${response.credential}&userId=${decodedToken.sub}`
);
  }
}
