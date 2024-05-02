import { CheckoutSummary } from "../models/checkout-summary";
import { PaymentInfo } from "../models/payment-info";

export interface PaymentPlatformReponse {
    checkoutSummary?: CheckoutSummary;
    paymentInfo?: PaymentInfo;
    platformResponse?: any;
}