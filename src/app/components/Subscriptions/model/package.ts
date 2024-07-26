import { Benefits } from './../../Admin/model/Benefits';
export interface Package{
    id:string
    name:string
    price:number
    numberOfListings:number
    paymentLink:string
    benefits:number[]
}