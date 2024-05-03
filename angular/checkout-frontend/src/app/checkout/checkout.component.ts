import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Transaction } from '../models/transaction';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  transaction?: Transaction;

  totalPrice?: number;
  totalAmount?: number;
  totalDiscount?: number;
  totalInsurance?: number;
  totalTax?: number;
  totalShipping?: number;
  totalShippingDiscount?: number;
  totalHandlingFee?: number;

  orderCreated = false;

  constructor(
    protected paymentService: PaymentService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.paymentService.setTransaction(this.paymentService.transaction);
    this.transaction = this.paymentService.getTransaction();
    this.totalPrice = this.transaction.shoppingCart?.items.map(item => item.price).reduce((previous, current) => current + previous);
    this.totalDiscount = this.transaction.shoppingCart?.items.map(item => item.discount).reduce((previous, current) => current! + previous!);
    this.totalTax = this.transaction.shoppingCart?.items.map(item => item.tax).reduce((previous, current) => current! + previous!);
    this.totalShipping = this.transaction.shoppingCart?.items.map(item => item.shipping).reduce((previous, current) => current! + previous!);
    this.totalShippingDiscount = this.transaction.shoppingCart?.items.map(item => item.shippingDiscount).reduce((previous, current) => current! + previous!);
    this.totalHandlingFee = this.transaction.shoppingCart?.items.map(item => item.handlingFee).reduce((previous, current) => current! + previous!);

    this.totalAmount = this.totalPrice! - this.totalDiscount! + this.totalTax! + this.totalShipping! - this.totalShippingDiscount! + this.totalHandlingFee!;
  }

  createOrder() {
    if (this.orderCreated) {
      return;
    }
    
    this.notificationService.showSpinner();
    this.paymentService.setTransaction(this.transaction!);
    this.paymentService.createOrder().subscribe({
      next: (response: any) => {
        this.transaction = this.paymentService.setTransaction(response.body);
      },
      complete: () => {
        this.orderCreated = true;
        this.notificationService.hideSpinner();
      }
    });
  }

  requestApproval() {
    this.notificationService.showSpinner();
    window.location.href = this.transaction?.paymentInfo?.approveUrl!;
  }
}
