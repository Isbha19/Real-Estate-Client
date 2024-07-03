import { Property } from './../../model/property';
import { PropertyCardComponent } from './../property-card/property-card.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';

import { } from '@angular/google-maps';
import { PropertyService } from '../../../Property/services/property.service';
import { GenericKeyValuePair } from '../../model/genericKeyValuePair';
import { PropertyCard } from '../../model/propertyCard';
import { AgentService } from '../../services/agent.service';


@Component({
  selector: 'app-list-property-form',
  standalone: true,
  imports: [MaterialModule, PropertyCardComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list-property-form.component.html',
  styleUrl: './list-property-form.component.scss',
})
export class ListPropertyFormComponent {
  isLinear = true;
  isStep2Clicked=false;
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
  propertyType: GenericKeyValuePair[] = [];
  furnishingType: GenericKeyValuePair[] = [];
  amenitiesOptions: GenericKeyValuePair[] = [];
  ListingType: GenericKeyValuePair[] = [];
  facilites: GenericKeyValuePair[] = [];
  @ViewChild('locationField') locationField!:ElementRef;
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;
  map!: google.maps.Map;
  marker!: google.maps.Marker;
@Input() locationPlaceHolder='';
autocomplete:google.maps.places.Autocomplete | undefined;
  constructor(private builder: FormBuilder, private toastr:ToastrService,
    private router:Router,
    private agentService:AgentService
  ) {}

  ngOnInit(): void {
  
    this.agentService.getPropertyTypes().subscribe({
      next: (response) => {
        console.log("property type"+JSON.stringify(response));
        
        this.propertyType = response;
      }
    });
    this.agentService.getFurnishingTypes().subscribe({
      next: (response) => {
        this.furnishingType = response;
      }
    });
    this.agentService.getAmenities().subscribe({
      next: (response) => {
        this.amenitiesOptions = response;
      }
    });
    this.agentService.getListingTypes().subscribe({
      next: (response) => {
        this.ListingType = response;
      }
    });
    this.agentService.getNearbyFacilities().subscribe({
      next: (response) => {
        this.facilites = response;
      }
    });
  }
  
  ngAfterViewInit(): void {
   this.autocomplete=new google.maps.places.Autocomplete(this.locationField.nativeElement, {
    componentRestrictions: { country: 'ae' } // Restrict to United Arab Emirates
  });
   this.autocomplete.addListener('place_changed',()=>{
    const place=this.autocomplete?.getPlace(); 
    if (place && place.formatted_address) {
      this.propertyView.location = place.formatted_address;
      if (place && place.geometry && place.geometry.location) {
        const location = place.geometry.location;
      this.marker.setPosition(location);
      this.map.setCenter(location);
    }} 
   })
   this.initMap();
  }
  private initMap(): void {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: { lat: 25.276987, lng: 55.296249 }, // Center map to Dubai initially
      zoom: 12
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: { lat: 25.276987, lng: 55.296249 }, // Center marker to Dubai initially
    });
  }

  listPropertyForm = this.builder.group({
    propertyOverview: this.builder.group({
      PropertyTitle: this.builder.control('', [Validators.required, Validators.maxLength(100)]),
      PropertyDescription: this.builder.control('', [Validators.required, Validators.maxLength(1000)]),
      PropertyTypeId: this.builder.control('', Validators.required),
      ListingTypeId: this.builder.control('', Validators.required),
      Price: this.builder.control('', [Validators.required, Validators.min(700),  Validators.pattern('^[0-9]*$')      ]),
      Location: this.builder.control<string>('', [Validators.required, Validators.maxLength(200)]),
    }),
    propertyDetails: this.builder.group({
      Bedrooms: this.builder.control('', [Validators.required, Validators.min(1)]),
      Bathrooms: this.builder.control('', [Validators.required, Validators.min(1)]),
      Size: this.builder.control('', [Validators.required, Validators.min(1)]),
      FurnishingTypeId: this.builder.control('', Validators.required),
      amenities: this.builder.control,
      nearByFacilities: this.builder.control,
    }),
    listingAndAgentDetails: this.builder.group({
      Images: this.builder.control('', Validators.required),
      virtualTourUrl: this.builder.control('', [Validators.required, Validators.pattern('https?://.+')]),
      agentName: this.builder.control('', Validators.required),
      agentContactNumber: this.builder.control('', Validators.required),
      emailAddress: this.builder.control('', [Validators.required, Validators.email]),
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
      console.log(this.listPropertyForm.value.propertyOverview?.PropertyTitle);
      const propertyOverview = this.propertyOverviewForm.value;
      const propertyDetails = this.propertyDetailsForm.value;
      const listingAndAgentDetails = this.listingAndAgentInfoForm.value;

      const property: Property = {
        PropertyTitle: propertyOverview.PropertyTitle,
        PropertyDescription: propertyOverview.PropertyDescription,
        PropertyTypeId: propertyOverview.PropertyTypeId,
        ListingTypeId: propertyOverview.ListingTypeId,
        Price: propertyOverview.Price,
        Location: propertyOverview.Location,
        Bedrooms: propertyDetails.Bedrooms,
        Bathrooms: propertyDetails.Bathrooms,
        Size: propertyDetails.Size,
        FurnishingTypeId: propertyDetails.FurnishingTypeId,
        // Additional properties as needed
      };
      this.agentService.addProperty(property).subscribe({
        next: (response:any) => {
          this.toastr.success(response.message)
          this.router.navigateByUrl('/');
        }
      });
    }
  }
  step2Clicked(){
    this.isStep2Clicked=true;
  }
  
}
