import { PaymentPlatformReponse } from "../dto/payment-platform-reponse.dto";
import { CheckoutSummary } from "../models/checkout-summary";
import { PaymentInfo } from "../models/payment-info";

export interface IPaymentService {
    createPaymentRequest(checkoutSummary: CheckoutSummary): Promise<PaymentPlatformReponse>;
    executePaymentRequest(paymentInfo: PaymentInfo): Promise<PaymentPlatformReponse>;
}