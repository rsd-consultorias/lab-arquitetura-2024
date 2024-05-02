import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutSummary } from '../models/checkout-summary';
import { PaymentInfo } from '../models/payment-info';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly API_URL = 'http://192.168.100.64:8080';

  checkoutSummary: CheckoutSummary = {
    buyerInfo: {
      firstName: "Fulano",
      lastName: "de Tal",
      birthDate: new Date("1984-08-01"),
      fiscalIdentificationNumber: "12345678901",
      email: "sb-brznd30619124@personal.example.com",
      phone: "12324423434535"
    },
    currency: "BRL",
    shoppingCart: {
      shoppingCartId: "",
      items: [
        {
          sku: "SKU1234",
          quantity: 1,
          price: 29.00,
          tax: 1.54,
          shipping: 10.34,
          insurance: 0,
          handlingFee: 0,
          shippingDiscount: 3.05,
          discount: 0,
          name: "Produto 1234",
          description: "Produto 1234 - XPTO - ABCD"
        },
        {
          sku: "SKU5678",
          quantity: 1,
          price: 34.00,
          tax: 1,
          shipping: 0,
          insurance: 0,
          handlingFee: 3.40,
          shippingDiscount: 0,
          discount: 0,
          name: "Produto 5678",
          description: "Produto 5678 - XPTO - ABCD"
        }
      ]
    },
    shippingAddress: {
      postalCode: "09123456",
      street: "Rua de teste, 404",
      district: "Teste",
      city: "Sao Paulo",
      state: "Sap Paulo",
      countryCode: "BR"
    }
  };

  constructor(
    private httpClient: HttpClient) { }

  setCheckoutSummary(updateTo: CheckoutSummary): CheckoutSummary {
    localStorage.setItem('checkout-summary', JSON.stringify(updateTo));
    this.checkoutSummary = updateTo;
    return updateTo;
  }

  getCheckoutSummary(): CheckoutSummary {
    this.checkoutSummary = JSON.parse(localStorage.getItem('checkout-summary')!) as CheckoutSummary;
    return this.checkoutSummary;
  }

  createOrder(): Observable<CheckoutSummary> {
    return this.httpClient.post<CheckoutSummary>(`${this.API_URL}/v1/checkout/create`, this.getCheckoutSummary());
  }

  finalizePayment(paymentInfo: PaymentInfo): Observable<CheckoutSummary> {
    return this.httpClient.post<CheckoutSummary>(`${this.API_URL}/v1/checkout/${this.getCheckoutSummary().transactionId}/finalize`, paymentInfo);
  }
}
