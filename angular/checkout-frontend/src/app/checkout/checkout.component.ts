import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { CheckoutSummary } from '../models/checkout-summary';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  constructor(private paymentService: PaymentService) {

  }

  requestApproval() {
    this.paymentService.requestApproval().subscribe({
      next: (response: CheckoutSummary) => {
        this.paymentService.updateCheckoutSummary(response);
        // @ts-ignore
        window.location.href = response.body.paymentInfo?.transactionResponseBody.links.filter(item => item.rel === 'approval_url').map(item => item.href)[0];
      }
    });
  }
}
