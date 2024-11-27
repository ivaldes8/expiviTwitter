import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthResponseData {
  data: {
    token: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  canAdmin = new BehaviorSubject<User | null>(null);
  private tokenExpiration: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string, name: string, avatarUrl: string) {
    const dinamicUrl = "auth/register";
    return this.http.post<AuthResponseData>(`${environment.API_URL}/${dinamicUrl}`,
      {
        email: email,
        password: password,
        name: name,
        avatar_url: avatarUrl
      }
    )
      .pipe(tap(resData => {
        this.handleAuthentication(resData.data.token);
      })
      );
  }

  login(email: string, password: string) {
    const dinamicUrl = "auth/login";
    return this.http.post<AuthResponseData>(`${environment.API_URL}/${dinamicUrl}`,
      {
        email: email,
        password: password
      }
    )
      .pipe(tap(resData => {
        this.handleAuthentication(resData.data.token);
      })
      );
  }

  autoLogin() {
    const userData: {
      _token: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData._token);

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  private handleAuthentication(token: string) {
    const user = new User(token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
