import { SubscriptionPackageService } from './../../../Subscriptions/services/subscriptionPackage.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Packages } from '../../../../shared/store/SubscriptionPackages/package.model';
import { getPackage } from '../../../../shared/store/SubscriptionPackages/package.selector';
import { Package } from '../../../Subscriptions/model/package';
import { Benefits } from '../../model/Benefits';
import { addpackage, addpackagesuccess } from '../../../../shared/store/SubscriptionPackages/package.action';
import { MaterialModule } from '../../../../material.module';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-edit-package',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,MaterialModule],
  templateUrl: './add-edit-package.component.html',
  styleUrl: './add-edit-package.component.scss',
})
export class AddEditPackageComponent {
  storeNgrx = inject(Store<{ packages: { package: Packages } }>);

  packageForm: FormGroup = new FormGroup({});
  data = inject(MAT_DIALOG_DATA);
  addNew = true;
  submitted = false;
  benefits: Benefits[] = []; // Array to hold benefits
  loading = false;
  actions$ = inject(Actions);
  

  constructor(private fb: FormBuilder, private toastr: ToastrService,
    private subscriptionService:SubscriptionPackageService,
    private dialogRef: MatDialogRef<AddEditPackageComponent>,
  ) {
      this.actions$
      .pipe(
        ofType(addpackagesuccess),
        take(1) // Only take the first occurrence and then unsubscribe
      )
      .subscribe(() => {
        this.dialogRef.close();
        this.loading=false;
      })
  }
  createPackage() {
    this.submitted = true;

       if (this.packageForm.valid) {
      const formValue = this.packageForm.value;
      this.storeNgrx.dispatch(addpackage({ packageinput: formValue }));
this.loading=true;
    }

  }
  
  ngOnInit(): void {
    this.initializeForm();
    const id = this.data.id;
    if (id) {
      this.addNew = false;
      this.storeNgrx.select(getPackage).subscribe((res) => {
        this.updateForm(res);
      });
    }
    this.loadBenefits(); // Load benefits data

  }
initializeForm(){
  this.packageForm = this.fb.group({
    Name: ['', Validators.required],
    Price: [null, [Validators.required, Validators.min(0)]],
    NumberOfListings: [null, [Validators.required, Validators.min(0)]],
    Description:['', Validators.required],
    //selectedBenefits: [[], Validators.required], // Form control for selected benefits

  });
}
  updateForm(plan: Package) {
    
    if (plan.name!=null) {
      this.packageForm.patchValue({
        Name: plan.name,
        Price: plan.price,
        NumberOfListings: plan.numberOfListings,
        
        //selectedBenefits: plan.benefits, // Assuming benefits are already an array of IDs

      });

    }
  }
  loadBenefits() {
    // Replace with actual service call to get benefits
    this.benefits = [
      { id: 1, name: 'Benefit 1' },
      { id: 2, name: 'Benefit 2' },
      { id: 3, name: 'Benefit 3' },
      // Add more benefits here
    ];
  }

}
