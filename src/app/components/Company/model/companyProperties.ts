export interface CompanyProperties {
    propertyId: number;
    propertyTitle: string;
    propertyType: string;
    listingType: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    size: number;
    propertyViews: number;
    agentName: string;
    postedOn: Date; // Date in TypeScript is used instead of DateTime in C#
    primaryImageUrl: string;
}
