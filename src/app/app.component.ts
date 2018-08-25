import { Component, OnInit } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token: any;
  constructor(private router: Router, private tokenservice: TokenService) {}
  title = 'chat-app';
  ngOnInit() {
    this.token = this.tokenservice.getToken();
    if (this.token) {
      this.router.navigate(['streams']);
    } else [this.router.navigate(['/'])];
  }
}
