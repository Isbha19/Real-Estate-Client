import { AgentPropertyService } from './../../services/agentProperty.service';
import { ApiResponse } from './../../../../core/model/response/ApiResponse';
import { Property } from './../../model/property';
import { PropertyCardComponent } from './../property-card/property-card.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  
} from '@angular/forms';
import { MaterialModule } from '../../../../material.module';

import {} from '@angular/google-maps';
import { PropertyService } from '../../../Property/services/property.service';
import { GenericKeyValuePair } from '../../model/genericKeyValuePair';
import { PropertyCard } from '../../model/propertyCard';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoadingSpinnerComponent } from '../../../User/shared/loading-spinner/loading-spinner.component';
import { AccountService } from '../../../../core/service/account.service';
import { JwtDecodedToken } from '../../../../core/model/jwtTokenDecoded';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-list-property-form',
  standalone: true,
  imports: [
    MaterialModule,
    PropertyCardComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './list-property-form.component.html',
  styleUrl: './list-property-form.component.scss',
})
export class ListPropertyFormComponent {
  isLinear = false;
  isStep2Clicked = false;
  propertyView: PropertyCard = {
    title: '',
    propertyType: '',
    listingType: '',
    location: '',
    size: 0,
    bathroom: 0,
    bedroom: 0,
    price: 0,
  };
  propertyType: GenericKeyValuePair[] = [];
  furnishingType: GenericKeyValuePair[] = [];
  amenitiesOptions: GenericKeyValuePair[] = [];
  ListingType: GenericKeyValuePair[] = [];
  facilites: GenericKeyValuePair[] = [];
  @ViewChild('locationField') locationField!: ElementRef;
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;
  map!: google.maps.Map;
  marker!: google.maps.Marker;
  @Input() locationPlaceHolder = '';
  listPropertyForm!: FormGroup;
  selectedFiles: File[] = [];
  loading = false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  autocomplete: google.maps.places.Autocomplete | undefined;
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private agentService: AgentPropertyService,
    private sanitizer: DomSanitizer,
    private accountService:AccountService
  ) {}

  ngOnInit(): void {
    this.InitializeForm();
    this.populateAgentInformation();
    this.agentService.getPropertyTypes().subscribe({
      next: (response) => {
        this.propertyType = response;
      },
    });
    this.agentService.getFurnishingTypes().subscribe({
      next: (response) => {
        this.furnishingType = response;
      },
    });
    this.agentService.getAmenities().subscribe({
      next: (response) => {
        this.amenitiesOptions = response;
      },
    });
    this.agentService.getListingTypes().subscribe({
      next: (response) => {
        this.ListingType = response;
      },
    });
    this.agentService.getNearbyFacilities().subscribe({
      next: (response) => {
        this.facilites = response;
      },
    });
    this.loadFormData();
    this.listPropertyForm.valueChanges.subscribe(() => {
      this.saveFormData();
    });
  }
  saveFormData() {
    localStorage.setItem(
      'listPropertyForm',
      JSON.stringify(this.listPropertyForm.value)
    );
  }
  loadFormData() {
    const savedFormData = localStorage.getItem('listPropertyForm');

    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      this.listPropertyForm
        .get('propertyOverview')
        ?.patchValue(formData.propertyOverview);
      this.listPropertyForm
        .get('propertyDetails')
        ?.patchValue(formData.propertyDetails);
      this.listPropertyForm
        .get('listingAndAgentDetails')
        ?.patchValue(formData.listingAndAgentDetails);
    }
  }
  ngAfterViewInit(): void {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.locationField.nativeElement,
      {
        componentRestrictions: { country: 'ae' }, // Restrict to United Arab Emirates
      }
    );
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      if (place && place.formatted_address) {
        this.propertyView.location = place.formatted_address;
        if (place && place.geometry && place.geometry.location) {
          const location = place.geometry.location;
          this.marker.setPosition(location);
          this.map.setCenter(location);
        }
      }
    });
    this.initMap();
  }
  private initMap(): void {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: { lat: 25.276987, lng: 55.296249 }, // Center map to Dubai initially
      zoom: 12,
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: { lat: 25.276987, lng: 55.296249 }, // Center marker to Dubai initially
    });
  }
  populateAgentInformation(): void {
    this.accountService.user$.subscribe((user) => {
      if (user) {
        const decodedToken: JwtDecodedToken = jwtDecode(user?.jwt);
        const agentInfo = this.listPropertyForm.get('listingAndAgentDetails');
        agentInfo?.get('agentName')?.setValue(user.firstName + ' ' + user.lastName);
        agentInfo?.get('emailAddress')?.setValue(decodedToken.email);
      }
    });
  }
  InitializeForm() {
    this.listPropertyForm = this.builder.group({
      propertyOverview: this.builder.group({
        PropertyTitle: this.builder.control('', [
          Validators.required,
          Validators.maxLength(100),
        ]),
        PropertyDescription: this.builder.control('', [
          Validators.required,
          Validators.maxLength(1000),
        ]),
        PropertyTypeId: this.builder.control('', Validators.required),
        ListingTypeId: this.builder.control('', Validators.required),
        Price: this.builder.control('', [
          Validators.required,
          Validators.min(700),
          Validators.pattern('^[0-9]*$'),
        ]),
        Location: this.builder.control<string>('', [
          Validators.required,
          Validators.maxLength(200),
        ]),
      }),
      propertyDetails: this.builder.group({
        Bedrooms: this.builder.control('', [
          Validators.required,
          Validators.min(1),
        ]),
        Bathrooms: this.builder.control('', [
          Validators.required,
          Validators.min(1),
        ]),
        Size: this.builder.control('', [
          Validators.required,
          Validators.min(1),
        ]),
        FurnishingTypeId: this.builder.control('', Validators.required),
        amenities: this.builder.control,
        nearByFacilities: this.builder.control,
      }),
      listingAndAgentDetails: this.builder.group({
        Images: this.builder.control(null, Validators.required),
        virtualTourUrl: this.builder.control('', [
          Validators.required,
          Validators.pattern('https?://.+'),
        ]),
        agentName: this.builder.control({ value: '', disabled: true },
          Validators.required),
        agentContactNumber: this.builder.control('', Validators.required),
        emailAddress: this.builder.control({ value: '', disabled: true },
          Validators.required),
        availabilityDate: this.builder.control('', Validators.required),
        termsAndCondition: this.builder.control(false, Validators.required),
      }),
    });
  }

  get propertyOverviewForm() {
    return this.listPropertyForm.get('propertyOverview') as FormGroup;
  }
  get propertyDetailsForm() {
    return this.listPropertyForm.get('propertyDetails') as FormGroup;
  }
  get listingAndAgentInfoForm() {
    return this.listPropertyForm.get('listingAndAgentDetails') as FormGroup;
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        this.selectedFiles.push(input.files[i]);
      }
      this.listingAndAgentInfoForm.patchValue({ Images: this.selectedFiles });
    }
  }

  // Remove a selected file
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.listingAndAgentInfoForm.patchValue({ Images: this.selectedFiles });
  }

  // Get file URL for displaying image
  getFileUrl(file: File): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }
  hasEnoughImages(): boolean {
    const enoughImages = this.selectedFiles.length >= 5;
    return enoughImages;
  }

  HandleSubmit() {
    if (this.listPropertyForm.valid && this.hasEnoughImages()) {
      this.loading = true;
      const propertyOverview = this.propertyOverviewForm.value;
      const propertyDetails = this.propertyDetailsForm.value;
      const listingAndAgentDetails = this.listingAndAgentInfoForm.value;

      const formData = new FormData();
      formData.append('PropertyTitle', propertyOverview.PropertyTitle);
      formData.append(
        'PropertyDescription',
        propertyOverview.PropertyDescription
      );
      formData.append('PropertyTypeId', propertyOverview.PropertyTypeId);
      formData.append('ListingTypeId', propertyOverview.ListingTypeId);
      formData.append('Price', propertyOverview.Price);
      formData.append('Location', propertyOverview.Location);
      formData.append('Bedrooms', propertyDetails.Bedrooms);
      formData.append('Bathrooms', propertyDetails.Bathrooms);
      formData.append('Size', propertyDetails.Size);
      formData.append('FurnishingTypeId', propertyDetails.FurnishingTypeId);
      formData.append('VirtualTourUrl', listingAndAgentDetails.virtualTourUrl);
      formData.append('AvailabilityDate', listingAndAgentDetails.availabilityDate);
      formData.append('PropertyAmenties', JSON.stringify(propertyDetails.amenities));

      formData.append('PropertyNearByFacilities', JSON.stringify(propertyDetails.nearByFacilities));



      // Append images
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('Images', this.selectedFiles[i]);
      }

      this.agentService.addProperty(formData).subscribe({
        next: (response: ApiResponse) => {
          this.toastr.success(response.message);
          this.router.navigateByUrl('/');
        },error:()=>{
          this.loading = false; 

        },
        complete: () => {
          this.loading = false; 
        }
      });
    }else{
      this.toastr.error("Please submit all required fields including images")
    }
  }
  step2Clicked() {
    this.isStep2Clicked = true;
  }
}
