import { User } from './../account/user';
export interface LoginResponse extends User{
    success:boolean,
    message:string
}