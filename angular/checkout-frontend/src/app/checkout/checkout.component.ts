import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { CheckoutSummary } from '../models/checkout-summary';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutSummary?: CheckoutSummary;

  constructor(
    protected paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    
  }

  createOrder() {
    this.paymentService.createOrder().subscribe({
      next: (response: any) => {
        this.checkoutSummary = this.paymentService.updateCheckoutSummary(response.body);
      }
    });
  }

  requestApproval() {
    window.location.href = this.checkoutSummary?.paymentInfo?.transactionResponseBody.links.filter((item: { rel: string; }) => item.rel === 'approval_url').map((item: { href: any; }) => item.href)[0];
  }
}
