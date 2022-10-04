import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(signupForm: NgForm) {
    const email = signupForm.value.email;
    const username = signupForm.value.username;
    const password = signupForm.value.password;

    this.authService.signup(email, username, password).subscribe((data) => {
      console.log(data);
    });

    this.router.navigate(['/login']);

    signupForm.reset();
  }
}
