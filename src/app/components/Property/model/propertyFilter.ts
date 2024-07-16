export interface PropertyFilter {
  Location: string;
    ListingType: number;
    PropertyType: number;
    Bedrooms: number[];
    Bathrooms: number[];
    MinPrice: number;
    MaxPrice: number;
    NearbyFacilities: number[];
    Amenities: number[];
    Furnished: number;
    MinSize: number;
    MaxSize: number;
    VirtualTour: boolean;
  }
  