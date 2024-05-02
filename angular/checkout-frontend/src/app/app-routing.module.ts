import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutCanceledComponent } from './checkout-canceled/checkout-canceled.component';
import { CheckoutApprovedComponent } from './checkout-approved/checkout-approved.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout-approved', component: CheckoutApprovedComponent },
  { path: 'checkout-success', component: CheckoutSuccessComponent },
  { path: 'checkout-canceled', component: CheckoutCanceledComponent },
  { path: '**', component: CatalogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
