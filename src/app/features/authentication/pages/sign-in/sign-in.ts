import { Component } from '@angular/core';
import { SigninForm } from '../../components/signin-form/signin-form';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [SigninForm, RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {}
