import { Injectable } from '@angular/core';
import { Basehttp } from '../../../core/services/baseHttp';
import { API_KEYS } from '../../../core/constants/appAPIs';
import { environments } from '../../../../environments/environments.dev';
import { Observable } from 'rxjs';
import { CardPayment, CashPayment } from '../interfaces/paymanetResponse';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends Basehttp {
  cashPayment(userData: {}, cardId: string): Observable<CashPayment> {
    return this.post<CashPayment>(
      `
      ${API_KEYS.cashPaymentKey}/${cardId}`,
      userData
    );
  }
  cardPayment(userData: {}, cardId: string): Observable<CardPayment> {
    return this.post<CardPayment>(
      `
      ${API_KEYS.cardPaymentKey}/${cardId}?url=${environments.APP_URL}`,
      userData
    );
  }
}
