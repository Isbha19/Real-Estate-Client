export interface JwtDecodedToken{
    role:string | string[];
    firstName:string;
    lastName:string;
    email:string;
    sub:string;
    nameid:string
}