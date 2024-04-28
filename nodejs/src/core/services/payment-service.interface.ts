import { CheckoutSummary } from "../models/checkout-summary";
import { ShoppingCart } from "../models/shopping-cart";

export interface IPaymentService {
    createPaymentRequest(shoppingCart: ShoppingCart): Promise<CheckoutSummary>;
    updatePaymentRequest(checkoutSummary: CheckoutSummary): Promise<CheckoutSummary>;
    reviewPaymentRequest(checkoutSummary: CheckoutSummary): Promise<CheckoutSummary>;
    executePaymentRequest(checkoutSummary: CheckoutSummary): Promise<CheckoutSummary>;
}