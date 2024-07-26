export interface TopCompaniesDto {
  id: number;
  name: string;
  revenue: number; // Total revenue from all agents' properties
  propertiesCount: number; // Total properties associated with the company
  companyLogo: string;
}
