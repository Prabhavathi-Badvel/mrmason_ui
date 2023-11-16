import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiserviceService } from '../apiservice/apiservice.service';
import { userData } from '../../interfaces/user.modal';
import { UserDetails } from '../../interfaces/user-details.modal'
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private apiService: ApiserviceService, private toast: ToastService) {
    this.isLoggedIn();
  }
  private tokenKey = 'token';
  public isLoggedIn$ = new BehaviorSubject(false);
  public isAdmin$ = new BehaviorSubject(false);
  public userId$ = new BehaviorSubject('');
  private user_id = '';

  private user = new BehaviorSubject<any>(null);
  user$ = this.user.asObservable();

  public login(username: string, password: string): void {
    this.apiService.login(username, password).subscribe({
      next :(res) => {
        if(res['status']) {
          localStorage.setItem(this.tokenKey, 'true');
          localStorage.setItem('USER_ID', res.data.USER_ID);
          // this.user_id = res.data.USER_ID;
          // this.userId$.next(res.data.USER_ID);
          if(res.data.USER_TYPE === 'EC') {
            this.isAdmin$.next(false);
            this.router.navigate(['/ec-dashboard']);
            this.user.next({ username: username, role: 'user' });
          } else {
            this.isAdmin$.next(true);
            this.router.navigate(['/dashboard']);
          }
          this.isLoggedIn$.next(true);

        } else {
          this.toast.show("Login failed! Please enter correct credentials");
        }

    },
   error: (error) => {
      // Handle the error and display a toast message
      // this.toastr.error('An error occurred while logging in. Please try again.', 'Error', {
      //   closeButton: true,
      //   progressBar: true,
      // });
    }
  });
  }

  public register(userData: userData): Observable<any> {
    return this.apiService.register(userData);
  }

  getUserId(){
    return this.user_id;
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
    this.isLoggedIn$.next(false);
    this.toast.show("Logout Successfully");

  }

  public forgotPassword(email:string,newpassword: string) {
    this.apiService.sendPasswordResetEmail(email,newpassword).
    subscribe((res) => {
      if(res['status']) {
        this.router.navigate(['/login']);
      } else {
        console.log('enter correct creds');
      }
    })
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    console.log('is logged in', token != null);
    this.isLoggedIn$.next(token != null);
    return token != null;
  }
  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }





}
