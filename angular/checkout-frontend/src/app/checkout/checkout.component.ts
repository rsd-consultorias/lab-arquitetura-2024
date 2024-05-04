import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Order } from '../models/order';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  order?: Order;

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
    this.paymentService.setOrder(this.paymentService.order);
    this.order = this.paymentService.getOrder();
    this.totalPrice = this.order.shoppingCart?.items.map(item => item.price).reduce((previous, current) => current + previous);
    this.totalDiscount = this.order.shoppingCart?.items.map(item => item.discount).reduce((previous, current) => current! + previous!);
    this.totalTax = this.order.shoppingCart?.items.map(item => item.tax).reduce((previous, current) => current! + previous!);
    this.totalShipping = this.order.shoppingCart?.items.map(item => item.shipping).reduce((previous, current) => current! + previous!);
    this.totalShippingDiscount = this.order.shoppingCart?.items.map(item => item.shippingDiscount).reduce((previous, current) => current! + previous!);
    this.totalHandlingFee = this.order.shoppingCart?.items.map(item => item.handlingFee).reduce((previous, current) => current! + previous!);

    this.totalAmount = this.totalPrice! - this.totalDiscount! + this.totalTax! + this.totalShipping! - this.totalShippingDiscount! + this.totalHandlingFee!;
  }

  createOrder() {
    if (this.orderCreated) {
      return;
    }
    
    this.notificationService.showSpinner();
    this.paymentService.setOrder(this.order!);
    this.paymentService.createOrder().subscribe({
      next: (response: any) => {
        this.order = this.paymentService.setOrder(response.body);
      },
      complete: () => {
        this.orderCreated = true;
        this.notificationService.hideSpinner();
      }
    });
  }

  requestApproval() {
    this.notificationService.showSpinner();
    window.location.href = this.order?.paymentInfo?.approveUrl!;
  }
}
