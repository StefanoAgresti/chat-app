import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  sendMessage(url: string, data: any) {
    return this.http.post(`${url}?auth=${this.authService.user.token}`, data);
  }

  getMessage(url: string) {
    return this.http.get(`${url}?auth=${this.authService.user.token}`);
  }
}
