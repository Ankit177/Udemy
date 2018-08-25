import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthTabComponent } from '../components/auth-tab/auth-tab.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { AuthService } from '../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  declarations: [AuthTabComponent, LoginComponent, SignupComponent],
  exports: [AuthTabComponent, LoginComponent, SignupComponent],
  providers: [AuthService]
})
export class AuthModule {}
