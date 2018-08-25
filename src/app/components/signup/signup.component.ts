import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  errormessage: string;
  showSpinner: boolean = false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tokenervice: TokenService
  ) {}

  ngOnInit() {
    this.init();
  }
  init() {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }
  registerUser() {
    this.showSpinner = true;
    this.authService.registerUser(this.signUpForm.value).subscribe(
      data => {
        this.tokenervice.setToken(data.token);
        setTimeout(() => {
          this.router.navigate(['streams']);
        }, 3000);
        this.signUpForm.reset();
      },
      err => {
        this.showSpinner = false;
        console.log(err);
        if (err.error.msg) {
          this.errormessage = err.error.msg[0].message;
        }
        if (err.error.message) {
          this.errormessage = err.error.message;
        }
      }
    );
  }
}
