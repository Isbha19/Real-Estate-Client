import { User } from './../model/account/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../model/account/register.model';
import { Login } from '../model/account/login.model';
import { Observable, ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmEmail } from '../model/account/confirmEmail';
import { ResetPassword } from '../model/account/resetPassword';
import { RegisterWithExternal } from '../model/account/registerWithExternal';
import { LoginWithExternal } from '../model/account/loginWithExternal';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../model/response/LoginResponse';
import { ApiResponse } from '../model/response/ApiResponse';

@Injectable({ providedIn: 'root' })
export class AccountService {
  
  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable();
  constructor(private http: HttpClient, private router: Router) {}

  refreshUser(jwt: string | null) {
    if (jwt === null) {
      this.userSource.next(null);
      return of(undefined);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this.http
      .get<User>(`${environment.apiUrl}account/refresh-user-token`, { headers })
      .pipe(
        map((user: User) => {
          this.setUser(user);
        })
      );
  }
  login(model: Login): Observable<LoginResponse |null> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}Account/login`, model).pipe(
      map((response: LoginResponse) => {
        // Assuming LoginResponse has a user property
        if (response && response.data) {
          this.setUser(response.data);
          return response; // Return full LoginResponse
        }
        return null; // Or handle invalid response as needed
      })
    );
  }

  register(model: Register):Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}Account/register`, model);
  }

  ConfirmEmail(model: ConfirmEmail):Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${environment.apiUrl}Account/confirm-email`, model);
  }
  logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('/');
  }
  private setUser(user: User) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }
  getjwt() {
    const key = localStorage.getItem(environment.userKey);
    
    if (key) {
      const user = JSON.parse(key);
      return user.jwt;
    } else {
      return null;
    }
  }
  resendEmailConfirmation(email: string):Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}Account/resend-email-confirmation-link/${email}`,
      {}
    );
  }
  forgotUserNameOrPassword(email: string):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}Account/forgot-username-or-password/${email}`,
      {}
    );
  }
  resetPassword(model: ResetPassword) :Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${environment.apiUrl}Account/reset-password`, model);
  }
  registerWithThirdParty(model: RegisterWithExternal):Observable<LoginResponse> {
    return this.http
    .post<LoginResponse>(`${environment.apiUrl}Account/register-with-third-party`, model)
    .pipe(
      map(response => {
        if (response && response.data) {
          const user: User = response.data;
          this.setUser(user);
          return response; // Return the full LoginResponse
        }
        // Handle the case where response is null or response.data is undefined
        throw new Error('Invalid response');
      })
    );
  }
  loginWithThirdParty(model:LoginWithExternal){
    return this.http.post<User>(
      `${environment.apiUrl}Account/login-with-third-party`,
      model
    ).pipe(
      map((user:User)=>{
        if(user){
          this.setUser(user);
          return user;
        }return null;
      })
    );
  }
}
