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
  nearByFacilities: string[]; // Assuming property.PropertyNearByFacilities.Select(nf => nf.Facility.Name).ToList()
  agentName: string; // Assuming property.Agent.user.FirstName + " " + property.Agent.user.LastName
  agentImage: string | null | undefined; // Assuming ImageUrl is a string property in AgentImage entity
  agentPhoneNumber: string; // Assuming property.Agent.phoneNumber
  agentEmail: string; // Assuming property.Agent.user.Email
  agentWhatsapp: string; // Assuming property.Agent.whatsAppNumber
  companyName: string; // Assuming property.Agent.company.CompanyName
  companyLogo: string | null | undefined; // Assuming CompanyLogo is a string property in CompanyFile entity
  agentPropertyCounts: string; // Assuming property.Agent.company.Agents.Count.ToString()
}
