import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-checkout-approved',
  templateUrl: './checkout-approved.component.html',
  styleUrls: ['./checkout-approved.component.scss']
})
export class CheckoutApprovedComponent implements OnInit {

  paymentId: string = '';
  payerId: string = '';
  token: string = '';

  constructor(
    private paymentService: PaymentService,
    private notificationService: NotificationService,
    private router: Router,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRouter.queryParamMap.subscribe(params => {
      this.notificationService.showSpinner();
      
      this.paymentId = params.get('paymentId')!;
      this.payerId = params.get('PayerID')!;
      this.token = params.get('token')!;

      this.paymentService.finalizePayment({
        platformPaymentId: this.paymentId,
        platormPayerId: this.payerId
      }).subscribe({
        next: () => { this.router.navigate(['checkout-success']); },
        error: (error) => { alert(error) },
        complete: () => {
          this.notificationService.hideSpinner();
        }
      });
    });
  }
}
