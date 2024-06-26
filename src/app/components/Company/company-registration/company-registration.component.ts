import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-company-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.scss',
})
export class CompanyRegistrationComponent {
  constructor(private builder: FormBuilder) {}
  ngOnInit(): void {}
  CompanyRegister = this.builder.group({
    companyInformation: this.builder.group({
      companyName: this.builder.control('', Validators.required),
      tradeName: this.builder.control('', Validators.required),
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
      businessDescription: this.builder.control('', Validators.required),
      numberOfEmployees: this.builder.control('', Validators.required),
      termsAndCondition: this.builder.control('', Validators.required),
    }),
  });
}
