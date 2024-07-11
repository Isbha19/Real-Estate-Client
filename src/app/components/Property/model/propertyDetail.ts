import { Image } from "../../Agent/model/Image";
import { PropertyCard } from "../../Agent/model/propertyCard";

export interface propertyDetail {
    propertyTitle:string;
    propertyType:string;
    listingType:string;
    price:number;
    location:string;
    size:number;
    bedrooms:number;
    bathrooms:number;
  propertyDescription: string;
  images?: Image[];
  furnishingType: string;
  availableFrom: Date;
  amenities: string[];
  nearByFacilities: string[]; 
  agentName: string; 
  agentImage: string | null | undefined; 
  agentPhoneNumber: string; 
  agentEmail: string; 
  agentWhatsapp: string;
  companyName: string; 
  companyLogo: string | null | undefined; 
  agentPropertyCounts: string; 
}
