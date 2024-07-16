import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { AgentPropertyService } from '../../../Agent/services/agentProperty.service';
import { GenericKeyValuePair } from '../../../Agent/model/genericKeyValuePair';

@Component({
  selector: 'app-more-filters',
  standalone: true,
  imports: [MaterialModule, FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './more-filters.component.html',
  styleUrl: './more-filters.component.scss',
})
export class MoreFiltersComponent {
  furnishingType: GenericKeyValuePair[] = [];
  amenitiesOptions: GenericKeyValuePair[] = [];
  ListingType: GenericKeyValuePair[] = [];
  facilites: GenericKeyValuePair[] = [];
  morefilterForm: FormGroup;
  @Output() filtersApplied = new EventEmitter<any>();

  constructor(private dialogRef: MatDialogRef<MoreFiltersComponent>,
    private agentService: AgentPropertyService,
    private formBuilder: FormBuilder

  ) {
    this.morefilterForm = this.formBuilder.group({
      selectedFacilities: [[]],
      selectedAmenities: [[]],
      selectedFurnished: [],
      selectedMinSize: [],
      selectedMaxSize: [],
      MaxSize: [],
      hasVirtualTour: [false],
    });
  }
  sizes=[500,600,700,800,900,1000, 1500,2000,2500,3000,4000,5000];
  selectedMaxSize!:number;
  selectedMinSize!:number;
  filteredSizeOptionsmax: number[] = [];
filteredSizeOptionsmin: number[] = [];
  Close(){
    this.dialogRef.close();
  }
  onMinSizeChange(selectedMinSize: number) {
    
    this.filteredSizeOptionsmax = this.sizes.filter(size => size >= selectedMinSize);
    if (this.selectedMaxSize && this.selectedMaxSize < selectedMinSize) {
      this.selectedMaxSize = 0;
    }
  }

  onMaxSizeChange(selectedMaxSize: number) {

    this.filteredSizeOptionsmin = this.sizes.filter(size => size <= selectedMaxSize);
    if (this.selectedMinSize && this.selectedMinSize > selectedMaxSize) {
      this.selectedMinSize = 0;
    }
  }
  
  ngOnInit(): void {
    this.filteredSizeOptionsmax = this.sizes.slice();
    this.filteredSizeOptionsmin = this.sizes.slice();


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
  
    this.agentService.getNearbyFacilities().subscribe({
      next: (response) => {
        this.facilites = response;
      },
    });
  }

  applyFilter() {

    const filters = {
      nearbyFacilities: this.morefilterForm.value.selectedFacilities.length ? this.morefilterForm.value.selectedFacilities : undefined,
      amenities: this.morefilterForm.value.selectedAmenities.length ? this.morefilterForm.value.selectedAmenities : undefined,
      furnished: this.morefilterForm.value.selectedFurnished !== 0 ? this.morefilterForm.value.selectedFurnished : undefined,
      minSize: this.selectedMinSize !== 0 ? this.selectedMinSize : undefined,
      maxSize: this.selectedMaxSize !== 0 ? this.selectedMaxSize : undefined,
      virtualTour: Boolean(this.morefilterForm.value.hasVirtualTour), // Convert boolean to 'yes' or 'no'
    };
    
    this.filtersApplied.emit(filters);
    this.dialogRef.close(filters); // Ensure you pass the data you want to emit
  }
}
