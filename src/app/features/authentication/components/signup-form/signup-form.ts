import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMessage } from '../error-message/error-message';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css',
})
export class SignupForm implements OnInit {
  ngOnInit(): void {
    this.signupFrom.setValue({
      name: 'Youssef Ashraf',
      email: 'youssefashraf123@gmail.com',
      password: 'Youssef@123',
      repassword: 'Youssef@123',
      phone: '01021324764',
    });
  }

  signupFrom = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMissMatch }
  );

  onSubmit(): void {
    this.signupFrom.markAllAsTouched();
    if (this.signupFrom.valid) {
      console.log(this.signupFrom.value);
    }
  }
  // Check passwords match method
  passwordMissMatch(formGroup: any) {
    const password = formGroup.get('password')?.value;
    const repassword = formGroup.get('repassword')?.value;

    return password === repassword ? null : { passwordMissMatch: true };
  }
}
