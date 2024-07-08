import { AgentRegister } from './../../model/agent/agentRegister';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../../../material.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgentService } from '../../services/agent.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../../core/service/account.service';
import { jwtDecode } from 'jwt-decode';
import { JwtDecodedToken } from '../../../../core/model/jwtTokenDecoded';
import { map, Observable, startWith } from 'rxjs';
import{CompanyNames} from '../../model/CompanyName'
@Component({
  selector: 'app-agent-registration-form',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './agent-registration-form.component.html',
  styleUrl: './agent-registration-form.component.scss'
})
export class AgentRegistrationFormComponent {
  agentForm!: FormGroup;
  companies:CompanyNames[]=[];
  filteredCompanies!: Observable<CompanyNames[]>;

  constructor(private fb: FormBuilder,private agentService:AgentService,
    private router:Router,private Toastr:ToastrService,
    private accountService:AccountService
  ) {}

  ngOnInit(): void {
    this.agentService.getCompanyNames().subscribe({
      next: (response) => {
        this.companies = response;
        console.log(this.companies);
        
      }
    });
    this.agentForm = this.fb.group({
      agentName: [{ value: '', disabled: true },
        Validators.required],
      email: [{ value: '', disabled: true },
        Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      nationality: ['', Validators.required],
      languagesKnown: ['', Validators.required],
      specialization: ['', Validators.required],
      whatsapp: ['', Validators.pattern(/^[0-9]+$/)],
      photo: [null, Validators.required],
      company: ['', Validators.required],
      about: ['', Validators.required],
      yearsOfExperience: ['', [Validators.required, Validators.min(0)]]
    });
    this.filteredCompanies = this.agentForm.get('company')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCompanies(value || ''))
    );
    
  }

  private _filterCompanies(value: string): CompanyNames[] {
    
    const filterValue = value.toLowerCase();
    const result= this.companies.filter(company =>
      company.companyName && company.companyName.toLowerCase().includes(filterValue)
    );    
    return result;
  }
  


  displayFn(company:CompanyNames): string {
    return company.companyName;
  }
 
  
ngAfterViewInit(): void {
  this.populateAgentInformation();

}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.agentForm.patchValue({ photo: file });
      this.agentForm.get('photo')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.agentForm.valid) {
      const selectedCompany = this.agentForm.value.company.companyName;

      // Check if selectedCompany exists in companies array
      if (!this.companies.some(company => company.companyName === selectedCompany)) {
        // If not found, display error and return
        this.agentForm.get('company')?.setErrors({ invalidCompany: true });
        return;
      }
      const Agent:AgentRegister={
        UserName: this.agentForm.value.agentName,
        phoneNumber: this.agentForm.value.phone,
        whatsAppNumber: this.agentForm.value.whatsapp,
        Nationality: this.agentForm.value.nationality,
        LanguagesKnown: this.agentForm.value.languagesKnown,
        Specialization: this.agentForm.value.specialization,
        AgentImage:this.agentForm.value.photo,
        CompanyId: this.agentForm.value.company.companyId,
        About: this.agentForm.value.about,
        yearsOfExperience: this.agentForm.value.yearsOfExperience      }
      this.agentService.addAgent(Agent).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/');
          this.Toastr.success(response.message);
        }
      });
    }
  }
  populateAgentInformation(): void {
    this.accountService.user$.subscribe((user) => {
      if (user) {
        const decodedToken: JwtDecodedToken = jwtDecode(user?.jwt);
        this.agentForm.get('agentName')?.setValue(user.firstName + ' ' + user.lastName);
        this.agentForm.get('email')?.setValue(decodedToken.email);
      }
    });
  }
  isControlInvalid(controlName: string): boolean |null{
    const control = this.agentForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
