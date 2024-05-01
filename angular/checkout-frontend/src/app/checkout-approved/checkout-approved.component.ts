import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout-approved',
  templateUrl: './checkout-approved.component.html',
  styleUrls: ['./checkout-approved.component.scss']
})
export class CheckoutApprovedComponent implements OnInit {

  paymentId: string = '';
  payerId: string = '';
  token: string = '';

  constructor(private router: Router,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRouter.queryParamMap.subscribe(params => {
      this.paymentId = params.get('paymentId')!;
      this.payerId = params.get('PayerID')!;
      this.token = params.get('token')!;
    });
    // this.paymentId = this.activateRouter.snapshot.paramMap.get('paymentId')!;
    // this.payerId = this.activateRouter.snapshot.paramMap.get('PayerID')!;
    // this.token = this.activateRouter.snapshot.paramMap.get('token')!;
  }
}
