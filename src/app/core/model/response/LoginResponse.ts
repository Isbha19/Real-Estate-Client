import { User } from './../account/user';
export interface LoginResponse{
    success:boolean,
    message:string,
    data:User
}