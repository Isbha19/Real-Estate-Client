import { PropertyCardComponent } from './../property-card/property-card.component';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { PropertyCard } from '../../../core/model/property/propertyCard';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-property-form',
  standalone: true,
  imports: [MaterialModule, PropertyCardComponent,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './list-property-form.component.html',
  styleUrl: './list-property-form.component.scss',
})
export class ListPropertyFormComponent {
  isLinear = true;
  propertyView: PropertyCard = {
    title: '',
    propertyType: '',
    listingType: '',
    location: '',
    size: 0,
    bathroom: 0,
    bedroom: 0,
    price: 0
  };
  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  listPropertyForm = this.builder.group({
    propertyOverview: this.builder.group({
      propertyTitle: this.builder.control('', [
        Validators.required,
       
      ]),
      Description: this.builder.control(''),
      propertyType: this.builder.control('', Validators.required),
      listingType: this.builder.control('', Validators.required),
      price: this.builder.control('', Validators.required),
      location: this.builder.control('', Validators.required),
    }),
    propertyDetails: this.builder.group({
      Bedrooms: this.builder.control('', Validators.required),
      Bathrooms: this.builder.control('', Validators.required),
      size: this.builder.control('', Validators.required),
      Furnishing: this.builder.control('', Validators.required),

      amenities: this.builder.control('', Validators.required),

      nearByFacilities: this.builder.control('', Validators.required),
    }),
    listingAndAgentDetails: this.builder.group({
      Images: this.builder.control('', Validators.required),
      virtualTourUrl: this.builder.control('', Validators.required),
      agentName: this.builder.control('', Validators.required),
      agentContactNumber: this.builder.control('', Validators.required),
      emailAddress: this.builder.control('', Validators.required),
      availabilityDate: this.builder.control('', Validators.required),
      termsAndCondition: this.builder.control(false, Validators.required),

    })
  });
  get propertyOverviewForm() {
    return this.listPropertyForm.get('propertyOverview') as FormGroup;
  }
  get propertyDetailsForm() {
    return this.listPropertyForm.get('propertyDetails') as FormGroup;
  }
  get listingAndAgentInfoForm() {
    return this.listPropertyForm.get('listingAndAgentDetails') as FormGroup;
  }
  HandleSubmit() {
    if (this.listPropertyForm.valid) {
      console.log(this.listPropertyForm.value);
    }
  }
}
