import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errormessage: string;
  showSpinner: boolean = false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tokenservice: TokenService
  ) {}

  ngOnInit() {
    this.init();
  }
  init() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  loginUser() {
    this.showSpinner = true;
    this.errormessage = '';
    this.authService.loginUser(this.loginForm.value).subscribe(
      data => {
        this.tokenservice.setToken(data.token);
        setTimeout(() => {
          this.router.navigate(['streams']);
        }, 3000);
        this.loginForm.reset();
      },
      err => {
        this.showSpinner = false;
        console.log(err);
        if (err.error.message) {
          this.errormessage = err.error.message;
        }
      }
    );
  }
}
