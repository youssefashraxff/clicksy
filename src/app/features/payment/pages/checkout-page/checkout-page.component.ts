import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-checkout-page',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {
  //   {
  //     "shippingAddress":{
  //         "details": "details",
  //         "phone": "01010700999",
  //         "city": "Cairo"
  //         }
  // }
  // Services
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly paymentService = inject(PaymentService);
  private readonly router = inject(Router);
  // Variables
  paymentForm!: FormGroup;
  cartId!: string;

  constructor() {
    this.cartId = this.activatedRoute.snapshot.params['cartId'];
    this.paymentForm = this.fb.group({
      details: ['Nasr City'],
      phone: ['01021324764'],
      city: ['Cairo'],
    });
  }

  pay(paymentMethod: string) {
    if (paymentMethod === 'cash') {
      this.cashPayment();
    } else {
      this.cardPayment();
    }
  }
  private cashPayment() {
    this.paymentService
      .cashPayment(this.paymentForm.value, this.cartId)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/allorders');
        },
      });
  }
  private cardPayment() {
    this.paymentService
      .cardPayment(this.paymentForm.value, this.cartId)
      .subscribe({
        next: (response) => {
          window.open(response.session.url, '_self');
        },
      });
  }
}
