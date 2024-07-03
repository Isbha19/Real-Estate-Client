import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listingTypeHeading',
  standalone: true

})
export class ListingTypeHeadingPipe implements PipeTransform {
  transform(listingType: string): string {
    switch (listingType) {
      case 'rent':
        return 'Properties for rent in UAE';
      case 'buy':
        return 'Properties for sale in UAE';
      case 'commercial':
        return 'Commercial Properties for Rent in the UAE';
      default:
        return 'Properties'; // Default heading if listingType doesn't match specific cases
    }
  }
}

