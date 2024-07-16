export interface MoreFiltersForProperty {
    nearbyFacilities: number[]; // Array of selected nearby facilities IDs
    amenities: number[]; // Array of selected amenities IDs
    furnished: number; // Selected furnished type ID
    minSize: number; // Minimum size filter
    maxSize: number; // Maximum size filter
    virtualTour?: boolean; 
  }
  