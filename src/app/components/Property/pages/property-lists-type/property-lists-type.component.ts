import { PropertyListing } from './../../model/propertyList';
import { MoreFiltersForProperty } from './../../model/PropertyMoreFilters';

import { MoreFiltersComponent } from './../more-filters/more-filters.component';
import { MaterialModule } from './../../../../material.module';
import {
  NgMultiSelectDropDownModule,
  IDropdownSettings,
} from 'ng-multiselect-dropdown';
import { ListingTypeHeadingPipe } from '../../../../core/pipe/listing-type-heading.pipe';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import { GenericKeyValuePair } from '../../../Agent/model/genericKeyValuePair';
import { AgentPropertyService } from '../../../Agent/services/agentProperty.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PropertyFilter } from '../../model/propertyFilter';

@Component({
  selector: 'app-property-lists-type',
  standalone: true,
  imports: [
    CommonModule,
    ListingTypeHeadingPipe,
    RouterLink,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
  ],
  templateUrl: './property-lists-type.component.html',
  styleUrl: './property-lists-type.component.scss',
})
export class PropertyListTypeComponent {
  propertyForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private agentService: AgentPropertyService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.propertyForm = this.formBuilder.group({
      locationField: [''],
      selectedListingType: [-1],
      selectedPropertyType: [-1],
      selectedBedrooms: [[]],
      selectedBathrooms: [[]],
      selectedMinPrice: [],
      selectedMaxPrice: [],
      selectedFacilities: [[]],
      selectedAmenities: [[]],
      selectedFurnished: [],
      selectedMinSize: [],
      selectedMaxSize: [],
      hasVirtualTour: [],
    });
  }
  properties: PropertyListing[] = [];
  listingType: string = '';
  propertyTypes: GenericKeyValuePair[] = [];
  ListingType: GenericKeyValuePair[] = [];
  @ViewChild('locationField') locationField!: ElementRef;
  autocomplete: google.maps.places.Autocomplete | undefined;
  bathAndBeds = [1, 2, 3, 4, 5, 6, 7];
  priceOptions = [700, 1000, 4000, 10000, 20000, 30000]; // Your actual price options
  selectedMinPrice!: number;
  selectedMaxPrice!: number;
  filteredPriceOptionsmax: number[] = [];
  filteredPriceOptionsmin: number[] = [];
  keepOpen = false;
  keepBathNBedOpen = false;
  startWithBathnBed() {
    this.keepBathNBedOpen = true;
  }
  doneWithBathnBed() {
    this.keepBathNBedOpen = false;
  }
  startWithPrice() {
    this.keepOpen = true;
  }
  doneWithprice() {
    this.keepOpen = false;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.listingType = params.get('listingType') || '';
      this.loadProperties();
    });
    this.filteredPriceOptionsmax = this.priceOptions.slice();
    this.filteredPriceOptionsmin = this.priceOptions.slice();

    this.agentService.getPropertyTypes().subscribe({
      next: (response: any) => {
        this.propertyTypes = response;
      },
    });

    this.agentService.getListingTypes().subscribe({
      next: (response) => {
        this.ListingType = response;
      },
    });
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
    });
  }
  onMinPriceChange(minPrice: number) {
    console.log(minPrice);

    this.filteredPriceOptionsmax = this.priceOptions.filter(
      (price) => price >= minPrice
    );
    if (this.selectedMaxPrice && this.selectedMaxPrice < minPrice) {
      this.selectedMaxPrice = 0;
    }
  }

  onMaxPriceChange(maxPrice: number) {
    console.log(maxPrice);

    this.filteredPriceOptionsmin = this.priceOptions.filter(
      (price) => price <= maxPrice
    );
    if (this.selectedMinPrice && this.selectedMinPrice > maxPrice) {
      this.selectedMinPrice = 0;
    }
  }
  loadProperties(): void {
    this.propertyService
      .getPropertiesBasedonListType(this.listingType)
      .subscribe({
        next: (properties: PropertyListing[]) => {
          this.properties = properties;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  onSubmit(): void {
  
      const filters = this.propertyForm.value;
  console.log("form value"+JSON.stringify(filters));

  const propertyFormValues = this.propertyForm.value;

  const filterProperty: PropertyFilter = {
    Location: propertyFormValues.locationField,
    ListingType: propertyFormValues.selectedListingType !== -1 ? propertyFormValues.selectedListingType : undefined,
    PropertyType: propertyFormValues.selectedPropertyType !== -1 ? propertyFormValues.selectedPropertyType : undefined,
    Bedrooms: propertyFormValues.selectedBedrooms,
    Bathrooms: propertyFormValues.selectedBathrooms,
    MinPrice: propertyFormValues.selectedMinPrice,
    MaxPrice: propertyFormValues.selectedMaxPrice,
    NearbyFacilities: propertyFormValues.selectedFacilities,
    Amenities: propertyFormValues.selectedAmenities,
    Furnished: propertyFormValues.selectedFurnished,
    MinSize: propertyFormValues.selectedMinSize,
    MaxSize: propertyFormValues.selectedMaxSize,
    VirtualTour: propertyFormValues.hasVirtualTour,
  };
  
  this.propertyService.getFilteredProperties(filterProperty).subscribe((data: any[]) => {
      this.propertyForm.reset();
      this.properties = data; // Assuming you update the view with filteredProperties
    });
    }  
  openMoreFiltersPopup() {
    const dialogRef = this.dialog.open(MoreFiltersComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result+"reached??");
      
      if (result) {
        console.log(JSON.stringify(result)+"frommm propertylistt");
        
        this.applyFilters(result); // Call a method to apply filters
      }
    });
  }
  applyFilters(filters:MoreFiltersForProperty){
console.log(JSON.stringify(filters)+"when first reached!");

    this.propertyForm.patchValue({
   
      selectedFacilities: filters.nearbyFacilities,
      selectedAmenities: filters.amenities,
      selectedFurnished: filters.furnished,
      selectedMinSize: filters.minSize,
      selectedMaxSize: filters.maxSize,
      hasVirtualTour: filters.virtualTour,
    });

    this.onSubmit();
  }
}
