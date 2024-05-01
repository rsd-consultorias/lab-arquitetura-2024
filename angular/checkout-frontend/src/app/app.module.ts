import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutCanceledComponent } from './checkout-canceled/checkout-canceled.component';
import { OopsComponent } from './oops/oops.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    CartComponent,
    CartSummaryComponent,
    CheckoutSuccessComponent,
    CheckoutCanceledComponent,
    OopsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
