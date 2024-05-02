import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { CheckoutSummary } from '../models/checkout-summary';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutSummary?: CheckoutSummary;
  totalPrice?: number;
  totalAmount?: number;
  totalDiscount?: number;
  totalInsurance?: number;
  totalTax?: number;
  totalShipping?: number;
  totalShippingDiscount?: number;
  totalHandlingFee?: number;

  constructor(
    protected paymentService: PaymentService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.paymentService.setCheckoutSummary(this.paymentService.checkoutSummary);
    this.checkoutSummary = this.paymentService.getCheckoutSummary();
    this.totalPrice = this.checkoutSummary.shoppingCart?.items.map(item => item.price).reduce((previous, current) => current + previous);
    this.totalDiscount = this.checkoutSummary.shoppingCart?.items.map(item => item.discount).reduce((previous, current) => current! + previous!);
    this.totalTax = this.checkoutSummary.shoppingCart?.items.map(item => item.tax).reduce((previous, current) => current! + previous!);
    this.totalShipping = this.checkoutSummary.shoppingCart?.items.map(item => item.shipping).reduce((previous, current) => current! + previous!);
    this.totalShippingDiscount = this.checkoutSummary.shoppingCart?.items.map(item => item.shippingDiscount).reduce((previous, current) => current! + previous!);
    this.totalHandlingFee = this.checkoutSummary.shoppingCart?.items.map(item => item.handlingFee).reduce((previous, current) => current! + previous!);

    this.totalAmount = this.totalPrice! - this.totalDiscount! + this.totalTax! + this.totalShipping! - this.totalShippingDiscount! + this.totalHandlingFee!;
  }

  createOrder() {
    this.notificationService.showSpinner();
    this.paymentService.createOrder().subscribe({
      next: (response: any) => {
        this.checkoutSummary = this.paymentService.setCheckoutSummary(response.body);
      },
      complete: () => {
        this.notificationService.hideSpinner();
      }
    });
  }

  requestApproval() {
    this.notificationService.showSpinner();
    window.location.href = this.checkoutSummary?.paymentInfo?.approveUrl!;
  }
}
