import { ListingTypeHeadingPipe } from '../../../../core/pipe/listing-type-heading.pipe';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import { PropertyListing } from '../../model/propertyList';

@Component({
  selector: 'app-property-lists-type',
  standalone: true,
  imports: [CommonModule,ListingTypeHeadingPipe,RouterLink],
  templateUrl: './property-lists-type.component.html',
  styleUrl: './property-lists-type.component.scss'
})
export class PropertyListTypeComponent {
  constructor(private route: ActivatedRoute, private propertyService: PropertyService) {}
  properties: PropertyListing[] = [];
  listingType: string="";

  // Add variables for each filter
  searchKeyword: string = '';
  propertyType: string = '';
  location: string = '';
  beds: number | null = null;
  bathrooms: number | null = null;
  priceMin: number | null = null;
  priceMax: number | null = null;
  facilities: string = '';
  amenities: string = '';
  furnished: string = '';
  keywords: string = '';
  size: number | null = null;
  virtualTour: string = '';


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.listingType = params.get('listingType')||'';
      this.loadProperties();
    });
  }
  loadProperties(): void {
    this.propertyService.getPropertiesBasedonListType(this.listingType).subscribe({
      next: (properties: PropertyListing[]) => { 
        console.log(JSON.stringify(properties));
             
        this.properties = properties;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  searchProperties(): void {
    // Implement search logic
    console.log('Search properties with the following filters:', {
      searchKeyword: this.searchKeyword,
      propertyType: this.propertyType,
      location: this.location,
      beds: this.beds,
      bathrooms: this.bathrooms,
      priceMin: this.priceMin,
      priceMax: this.priceMax
    });
  }
  applyFilters(): void {
    // Implement apply filters logic
    console.log('Apply filters with the following details:', {
      facilities: this.facilities,
      amenities: this.amenities,
      furnished: this.furnished,
      keywords: this.keywords,
      size: this.size,
      virtualTour: this.virtualTour
    });

}
}