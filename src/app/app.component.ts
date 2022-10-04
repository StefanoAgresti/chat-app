import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'chat-app';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user')!);

      this.authService.createUser(
        user.email,
        user.displayName,
        user.id,
        user._token,
        user._expirationDate
      );
    }
  }
}
