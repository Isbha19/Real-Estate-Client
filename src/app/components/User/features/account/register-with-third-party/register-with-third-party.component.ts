import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RegisterWithExternal } from '../../../../../core/model/account/registerWithExternal';
import { User } from '../../../../../core/model/account/user';
import { AccountService } from '../../../../../core/service/account.service';


@Component({
  selector: 'app-register-with-third-party',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register-with-third-party.component.html',
  styleUrl: './register-with-third-party.component.scss'
})
export class RegisterWithThirdPartyComponent {
  registerForm:FormGroup=new FormGroup({});
  submitted=false;
  provider:string|null=null;
  access_token:string|null=null;
  userId:string|null=null;
  
constructor( private formBuilder: FormBuilder,
  private accountService: AccountService,
  private router:Router,
private activatedRoute:ActivatedRoute,
private toastr:ToastrService){

}
ngOnInit(): void {
this.accountService.user$.pipe(take(1)).subscribe({
  next:(user:User | null)=>{
    if(user){
      this.router.navigateByUrl('/');
    }else{
      this.activatedRoute.queryParamMap.subscribe({
        next:(params:any)=>{
          this.provider=this.activatedRoute.snapshot.paramMap.get('provider');
          this.access_token=params.get('access_token');
          this.userId=params.get('userId');
        if(this.provider&&this.access_token &&this.userId && (this.provider==='facebook'||this.provider==='google')){
this.initializeForm();
        }else{
          this.router.navigateByUrl('/')
        }
          
          
        }
      })
    }
  }
})
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
    ]
  });
}

register(){
  this.submitted=true;
  console.log("heree1");
  
  if(this.registerForm.valid && this.userId&&this.access_token&&this.provider){
    console.log("works");
    
    const firstName=this.registerForm.get('firstName')?.value;
    const lastName=this.registerForm.get('lastName')?.value;
    const model=new RegisterWithExternal(firstName,lastName,this.userId,this.access_token,this.provider);
    console.log(model+"ml");
    
    this.accountService.registerWithThirdParty(model).subscribe({
      next: (response: any) => {
        console.log(response+"pl");
        
        if (response && response.message) {
          this.toastr.success(response.message);
          this.router.navigateByUrl('/');
      } else {
          this.toastr.error('Unexpected response format');
          this.router.navigateByUrl('/');
      }
        
    },
    error: (error) => {      
      const errorMessage = error.error?.message || 'An error occurred';
      this.toastr.error(errorMessage);
      
      console.log('Navigating to home page on error');
      this.router.navigateByUrl('/').then(navigated => {
        console.log(`Navigated: ${navigated}`);
      });
    }
  });
}
}}
