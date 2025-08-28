import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorMessage } from '../error-message/error-message';
import { AuthServices } from '../../services/auth.services';
import { HttpErrorResponse } from '@angular/common/http';
import { interval, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-form',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.css',
})
export class SigninForm implements OnInit {
  // Variables
  errorMessage!: string | undefined;
  successMessage!: string | undefined;
  isLoading: boolean = false;
  timer: number = 5;

  // Injectables
  private readonly authServices = inject(AuthServices);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.signinForm.setValue({
      email: 'youssefashraf@gmail.com',
      password: 'Ya@12345',
    });
  }

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    console.log('done');
    this.handleBeforeSubmit();
    if (this.signinForm.valid) {
      const userData = this.signinForm.value;
      this.authServices.loginUser(userData).subscribe({
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
    this.signinForm.markAllAsTouched();
    this.errorMessage = undefined;
    this.isLoading = true;
  }
  handleSuccessResponse(response: any): void {
    console.log(response);
    this.signinForm.reset();
    this.successMessage = response.message;
    this.isLoading = false;
    interval(1000)
      .pipe(take(5))
      .subscribe(() => {
        this.timer--;
        if (this.timer === 0) {
          this.router.navigateByUrl('home');
        }
      });
  }
  handleErrorResponse(error: HttpErrorResponse): void {
    this.errorMessage = error.error.message;
    this.isLoading = false;
  }
}
