import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {

  orderNumber?: string;

  constructor(private paymentService: PaymentService) {

  }

  ngOnInit(): void {
    this.orderNumber = this.paymentService.getOrder().paymentInfo!.token;
  }

}
