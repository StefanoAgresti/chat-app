import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(loginForm: NgForm) {
    const email = loginForm.value.email;
    const password = loginForm.value.password;

    this.authService.login(email, password).subscribe((data: any) => {
      console.log(data);

      const expirationDate = new Date(
        new Date().getTime() + data.expiresIn * 1000
      );

      this.authService.createUser(
        data.email,
        data.displayName,
        data.localId,
        data.idToken,
        expirationDate
      );
      localStorage.setItem('user', JSON.stringify(this.authService.user));

      console.log(this.authService.user);

      this.router.navigate(['/chat']);
    });

    loginForm.reset();
  }
}
