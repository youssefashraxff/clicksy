import { Component } from '@angular/core';

import { SignupForm } from '../../components/signup-form/signup-form';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [SignupForm, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {}
