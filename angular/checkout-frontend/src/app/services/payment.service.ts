import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { PaymentInfo } from '../models/payment-info';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly API_URL = 'http://192.168.100.64:8080';

  order: Order = {
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
          price: 19.30,
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
      street: "Rua dos Testes, 404",
      district: "Bairro de Teste",
      city: "Sao Paulo",
      state: "Sao Paulo",
      countryCode: "BR"
    }
  };

  constructor(
    private httpClient: HttpClient) { }

  setOrder(updateTo: Order): Order {
    localStorage.setItem('transaction-summary', JSON.stringify(updateTo));
    this.order = updateTo;
    return updateTo;
  }

  getOrder(): Order {
    this.order = JSON.parse(localStorage.getItem('transaction-summary')!) as Order;
    return this.order;
  }

  createOrder(): Observable<Order> {
    return this.httpClient.post<Order>(`${this.API_URL}/v1/transaction/create`, this.getOrder());
  }

  finalizePayment(paymentInfo: PaymentInfo): Observable<Order> {
    return this.httpClient.post<Order>(`${this.API_URL}/v1/transaction/${this.getOrder().paymentInfo?.token}/finalize`, paymentInfo);
  }
}
