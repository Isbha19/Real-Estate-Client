import { Image } from "../../Agent/model/Image";
import { PropertyCard } from "../../Agent/model/propertyCard";

export interface propertyDetail extends PropertyCard{
    propertyDescription:string
    images?:Image[]
}