import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutSummary } from '../models/checkout-summary';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly API_URL = 'http://192.168.100.64:8080';

  private static checkoutSummary: CheckoutSummary = {
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
          "sku": "SKU1234",
          "quantity": 1,
          "price": 129.00,
          "tax": 1,
          "shipping": 0,
          "insurance": 0,
          "handlingFee": 0,
          "shippingDiscount": 0,
          "discount": 0,
          "name": "Produto 1234",
          "description": "Produto 1234 - XPTO - ABCD"
        },
        {
          sku: "SKU5678",
          quantity: 1,
          price: 520.00,
          tax: 1,
          shipping: 0,
          insurance: 0,
          handlingFee: 0,
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

  updateCheckoutSummary(updateTo: CheckoutSummary): CheckoutSummary {
    PaymentService.checkoutSummary = updateTo;
    return PaymentService.checkoutSummary;
  }

  getCheckoutSummary(): CheckoutSummary {
    return PaymentService.checkoutSummary;
  }

  createOrder(): Observable<CheckoutSummary> {
    return this.httpClient.post<CheckoutSummary>(`${this.API_URL}/v1/checkout/create`, PaymentService.checkoutSummary);
  }

  finalizePayment(): Observable<CheckoutSummary> {
    return this.httpClient.post<CheckoutSummary>(`${this.API_URL}/v1/checkout/${PaymentService.checkoutSummary.transactionId}/finalize`, PaymentService.checkoutSummary.paymentInfo);
  }
}
