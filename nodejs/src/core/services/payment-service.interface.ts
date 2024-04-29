import { CheckoutSummary } from "../models/checkout-summary";
import { PaymentInfo } from "../models/payment-info";

export interface IPaymentService {
    createPaymentRequest(checkoutSummary: CheckoutSummary): Promise<CheckoutSummary>;
    updatePaymentRequest(checkoutSummary: CheckoutSummary): Promise<CheckoutSummary>;
    reviewPaymentRequest(checkoutSummary: CheckoutSummary): Promise<CheckoutSummary>;
    executePaymentRequest(paymentInfo: PaymentInfo): Promise<any>;
}