import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;
  constructor(private http: HttpClient) {}

  authStatus() {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }

  createUser(
    email: string,
    displayName: string,
    id: string,
    token: string,
    expirationDate: Date
  ) {
    this.user = new User(email, displayName, id, token, expirationDate);
  }

  signup(email: string, displayName: string, password: string) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        environment.firebaseConfig.apiKey,
      {
        email: email,
        displayName: displayName,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  login(email: string, password: string) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        environment.firebaseConfig.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
  logout() {
    this.user = null as any;
    localStorage.removeItem('user');
  }
}
