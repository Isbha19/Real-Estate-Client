import { companyRegister } from './../../model/companyRegister';
import { CompanyService } from '../../service/company.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../../core/service/account.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GenericKeyValuePair } from '../../../Agent/model/genericKeyValuePair';
import { CompanyRegisterResponse } from '../../model/companyRegisterResponse';
import { JwtDecodedToken } from '../../../../core/model/jwtTokenDecoded';
import { ApiResponse } from '../../../../core/model/response/ApiResponse';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-company-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.scss',
})
export class CompanyRegistrationComponent {
  isLinear = true;
  companyStructures: GenericKeyValuePair[] = [];
  businessActivityTypes: GenericKeyValuePair[] = [];
  selectedCompanyLogoFileName: string | null = null;
  file: File;
  loading = false;
  logoSubmitted = false;
  constructor(
    private builder: FormBuilder,
    private accountService: AccountService,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.file = {} as File; // Initialize file in the constructor
  }
  ngOnInit(): void {
    this.populateRepresentativeInformation();
    this.companyService.getCompanyStructures().subscribe({
      next: (response) => {
        this.companyStructures = response;
      },
    });
    this.companyService.getBusinessActivityTypes().subscribe({
      next: (response) => {
        this.businessActivityTypes = response;
      },
    });
    this.loadFormData();
    this.CompanyRegister.valueChanges.subscribe(() => {
      this.saveFormData();
    });
  }
  saveFormData() {
    localStorage.setItem(
      'companyRegisterForm',
      JSON.stringify(this.CompanyRegister.value)
    );
  }
  loadFormData() {
    const savedFormData = localStorage.getItem('companyRegisterForm');

    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      this.CompanyRegister.get('companyInformation')?.patchValue(
        formData.companyInformation
      );
      this.CompanyRegister.get('contactInformation')?.patchValue(
        formData.contactInformation
      );
      this.CompanyRegister.get('RepresentativeInformation')?.patchValue(
        formData.RepresentativeInformation
      );
      this.CompanyRegister.get('legalDocuments')?.patchValue(
        formData.legalDocuments
      );
      this.CompanyRegister.get('additionalInformation')?.patchValue(
        formData.additionalInformation
      );
    }
  }

  CompanyRegister = this.builder.group({
    companyInformation: this.builder.group({
      companyName: this.builder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
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
      repName: this.builder.control(
        { value: '', disabled: true },
        Validators.required
      ),
      repPosition: this.builder.control('', Validators.required),
      repContactNumber: this.builder.control('', Validators.required),
      repEmailAddress: this.builder.control(
        { value: '', disabled: true },
        Validators.required
      ),
    }),
    legalDocuments: this.builder.group({
      companyRegistrationDoc: this.builder.control('', Validators.required),
      tradeLicenseCopy: this.builder.control('', Validators.required),
      reraCertificateCopy: this.builder.control('', Validators.required),
      tenancyContract: this.builder.control('', Validators.required),
    }),
    additionalInformation: this.builder.group({
      companyLogo: this.builder.control(null),
      businessDescription: this.builder.control('', Validators.required),
      numberOfEmployees: this.builder.control('', Validators.required),
      termsAndCondition: this.builder.control(false, Validators.required),
    }),
  });
  get BasicinfoForm() {
    return this.CompanyRegister.get('companyInformation') as FormGroup;
  }
  get contactInfoForm() {
    return this.CompanyRegister.get('contactInformation') as FormGroup;
  }
  get RepInfoForm() {
    return this.CompanyRegister.get('RepresentativeInformation') as FormGroup;
  }
  get legalDocForm() {
    return this.CompanyRegister.get('legalDocuments') as FormGroup;
  }
  get additionalInfoForm() {
    return this.CompanyRegister.get('additionalInformation') as FormGroup;
  }
  HandleSubmit() {
    if (this.CompanyRegister.valid && this.logoSubmitted) {
      const companyFormData = this.CompanyRegister.value;

      const companyData: companyRegister = {
        CompanyName: companyFormData?.companyInformation?.companyName ?? '',
        TradeName: companyFormData?.companyInformation?.tradeName ?? '',
        CompanyStructureId:
          Number(companyFormData?.companyInformation?.companyStructure) || 0,
        CompanyRegistrationNumber:
          companyFormData?.companyInformation?.companyRegistrationNumber ?? '',
        LicenseNumber: companyFormData?.companyInformation?.licenseNumber ?? '',
        ReraCertificateNumber:
          companyFormData?.companyInformation?.reraCertificateNumber ?? '',
        BusinessActivityTypeId:
          Number(companyFormData?.companyInformation?.businessActivityType) ||
          0,
        CompanyAddress:
          companyFormData?.contactInformation?.companyAddress ?? '',
        PhoneNumber: companyFormData?.contactInformation?.phoneNumber ?? '',
        EmailAddress: companyFormData?.contactInformation?.emailAddress ?? '',
        WebsiteUrl: companyFormData?.contactInformation?.websiteUrl ?? '',
        RepresentativeContactNumber:
          companyFormData?.RepresentativeInformation?.repContactNumber ?? '',
        CompanyRegistrationDoc:
          companyFormData?.legalDocuments?.companyRegistrationDoc ?? '',
        TradeLicenseCopy:
          companyFormData?.legalDocuments?.tradeLicenseCopy ?? '',
        ReraCertificateCopy:
          companyFormData?.legalDocuments?.reraCertificateCopy ?? '',
        TenancyContract: companyFormData?.legalDocuments?.tenancyContract ?? '',
        CompanyLogo: companyFormData?.additionalInformation?.companyLogo ?? '',
        BusinessDescription:
          companyFormData?.additionalInformation?.businessDescription ?? '',
        NumberOfEmployees:
          companyFormData?.additionalInformation?.numberOfEmployees ?? '',
      };

      this.companyService.addCompany(companyData).subscribe({
        next: (response: CompanyRegisterResponse) => {
          localStorage.removeItem('companyRegisterForm');

          const companyId = response.id;

          if (this.file) {
            this.companyService
              .uploadCompanyLogo(this.file, companyId)
              .subscribe({
                next: (_) => {
                  this.router.navigateByUrl('subscription-package');
                  this.toastr.success(response.message);
                },
              });
          }
        },
      });
    }else{
      this.toastr.error("Please ensure you have sumitted all the fields and uploaded company logo")
    }
  }
  populateRepresentativeInformation(): void {
    this.accountService.user$.subscribe((user) => {
      if (user) {
        const decodedToken: JwtDecodedToken = jwtDecode(user?.jwt);
        const repInfo = this.CompanyRegister.get('RepresentativeInformation');
        repInfo?.get('repName')?.setValue(user.firstName + ' ' + user.lastName);
        repInfo?.get('repEmailAddress')?.setValue(decodedToken.email);
      }
    });
  }
  onFileSelected(event: Event): void {
    this.logoSubmitted = true;
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      this.selectedCompanyLogoFileName = this.file.name;
      const additionalInfo = this.CompanyRegister.get('additionalInformation');
      // additionalInfo?.get('companyLogo')?.setValue(this.file);
    }
  }
}
