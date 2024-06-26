import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-company-registration',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.scss',
})
export class CompanyRegistrationComponent {
  isLinear=true;
  constructor(private builder: FormBuilder) {}
  ngOnInit(): void {}
  CompanyRegister = this.builder.group({
    companyInformation: this.builder.group({
      companyName: this.builder.control('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern("^[-'a-zA-Z]+$"),
      ],),
      tradeName: this.builder.control(''),
      companyStructure: this.builder.control('', Validators.required),
      companyRegistrationNumber: this.builder.control('', Validators.required),
      licenseNumber: this.builder.control('', Validators.required),
      reraCertificateNumber: this.builder.control('', Validators.required),
      businessActivityType: this.builder.control('', Validators.required),
    }),
    contactInformation: this.builder.group({
      companyAddress: this.builder.control('', Validators.required),
      phoneNumber: this.builder.control('', Validators.required),
      emailAddress: this.builder.control('', Validators.required),
      websiteUrl: this.builder.control('', Validators.required),
    }),
    RepresentativeInformation: this.builder.group({
      repName: this.builder.control('', Validators.required),
      repPosition: this.builder.control('', Validators.required),
      repContactNumber: this.builder.control('', Validators.required),
      repEmailAddress: this.builder.control('', Validators.required),
    }),
    legalDocuments: this.builder.group({
      companyRegistrationDoc: this.builder.control('', Validators.required),
      tradeLicenseCopy: this.builder.control('', Validators.required),
     reraCertificateCopy: this.builder.control('', Validators.required),
      tenancyContract: this.builder.control('', Validators.required),
    }),
    additionalInformation: this.builder.group({
      companyLogo:this.builder.control('',Validators.required),
      businessDescription: this.builder.control('', Validators.required),
      numberOfEmployees: this.builder.control('', Validators.required),
      termsAndCondition: this.builder.control('', Validators.required),
    }),
  });
  get BasicinfoForm(){
    return this.CompanyRegister.get("companyInformation") as FormGroup;
  }
  get contactInfoForm(){
    return this.CompanyRegister.get("contactInformation") as FormGroup
  }
  get RepInfoForm(){
    return this.CompanyRegister.get("RepresentativeInformation") as FormGroup
  }
  get legalDocForm(){
    return this.CompanyRegister.get("legalDocuments") as FormGroup
  }
  get additionalInfoForm(){
    return this.CompanyRegister.get("additionalInformation") as FormGroup
  }
  HandleSubmit(){
    if(this.CompanyRegister.valid){
      console.log(this.CompanyRegister.value);
      
    }
  }
}
