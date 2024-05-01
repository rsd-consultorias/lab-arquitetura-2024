import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutSummary } from '../models/checkout-summary';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  requestApproval(): Observable<CheckoutSummary> {
    return this.httpClient.post<CheckoutSummary>(`http://localhost:8080/v1/checkout/create`, {
      "buyerInfo": {
        "firstName": "Fulano",
        "lastName": "de Tal",
        "birthDate": "1984-08-01",
        "fiscalIdentificationNumber": "12345678901",
        "email": "sb-brznd30619124@personal.example.com",
        "phone": "12324423434535"
      },
      "currency": "BRL",
      "shoppingCart": {
        "items": [
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
            "sku": "SKU5678",
            "quantity": 1,
            "price": 520.00,
            "tax": 1,
            "shipping": 0,
            "insurance": 0,
            "handlingFee": 0,
            "shippingDiscount": 0,
            "discount": 0,
            "name": "Produto 5678",
            "description": "Produto 5678 - XPTO - ABCD"
          }
        ]
      },
      "shippingAddress": {
        "postalCode": "09123456",
        "street": "Rua de teste, 404",
        "district": "Teste",
        "city": "Sao Paulo",
        "state": "Sap Paulo",
        "countryCode": "BR"
      }
    });
  }

  finalizePayment(checkoutSummary: CheckoutSummary): Observable<CheckoutSummary> {
    return this.httpClient.post<CheckoutSummary>(`http://localhost:8080/v1/checkout/${checkoutSummary.transactionId}/finalize`, checkoutSummary.paymentInfo);
  }
}
