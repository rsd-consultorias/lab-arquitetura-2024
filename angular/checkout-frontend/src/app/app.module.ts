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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RDNavBarComponent } from './components/nav-bar/nav-bar.component';
import { RDCardComponent } from './components/card/card.component';
import { CheckoutApprovedComponent } from './checkout-approved/checkout-approved.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    CartComponent,
    CartSummaryComponent,
    CheckoutSuccessComponent,
    CheckoutCanceledComponent,
    OopsComponent,
    CheckoutApprovedComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RDNavBarComponent,
    RDCardComponent,
    MatButtonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
