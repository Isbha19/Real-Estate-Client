import { Image } from "./Image";
import { PropertyCard } from "./propertyCard";

export interface propertyDetail extends PropertyCard{
    propertyDescription:string
    images?:Image[]
}