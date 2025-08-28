import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMessage } from '../error-message/error-message';
import { AuthServices } from '../../services/auth.services';
import { HttpErrorResponse } from '@angular/common/http';
import { registerUserResponse } from '../../interfaces/registerUserResponse';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css',
})
export class SignupForm implements OnInit {
  // Inject Services
  private readonly authServices = inject(AuthServices);
  private readonly router = inject(Router);

  // Varibales
  errorMessage!: string | undefined;
  successMessage!: string | undefined;
  isLoading: boolean = false;
  timer: number = 5;

  ngOnInit(): void {
    this.signupFrom.setValue({
      name: 'Youssef Ashraf',
      email: 'youssefashraf123@gmail.com',
      password: 'Youssef@123',
      rePassword: 'Youssef@123',
      phone: '01021324764',
    });
  }

  signupFrom = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMissMatch }
  );
  // Check passwords match method
  passwordMissMatch(formGroup: any) {
    const password = formGroup.get('password')?.value;
    const rePassword = formGroup.get('rePassword')?.value;

    return password === rePassword ? null : { passwordMissMatch: true };
  }
  onSubmit(): void {
    this.handleBeforeSubmit();
    if (this.signupFrom.valid) {
      const userData = this.signupFrom.value;
      this.authServices.registerUser(userData).subscribe({
        next: (response) => {
          this.handleSuccessResponse(response);
        },
        error: (error: HttpErrorResponse) => {
          this.handleErrorResponse(error);
        },
      });
    }
  }
  handleBeforeSubmit(): void {
    this.signupFrom.markAllAsTouched();
    this.errorMessage = undefined;
    this.isLoading = true;
  }
  handleSuccessResponse(response: registerUserResponse): void {
    console.log(response);
    this.signupFrom.reset();
    this.successMessage = response.message;
    this.isLoading = false;

    interval(1000)
      .pipe(take(5))
      .subscribe(() => {
        this.timer--;
        if (this.timer === 0) {
          this.router.navigateByUrl('signin');
        }
      });
  }
  handleErrorResponse(error: HttpErrorResponse): void {
    this.errorMessage = error.error.message;
    this.isLoading = false;
  }
}
