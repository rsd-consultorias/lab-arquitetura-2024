import { PaymentPlatformReponse } from "../dto/payment-platform-reponse.dto";
import { Order } from "../models/entities/order";
import { PaymentInfo } from "../models/entities/payment-info";

export interface IPaymentService {
    createPaymentRequest(order: Order): Promise<PaymentPlatformReponse>;
    executePaymentRequest(paymentInfo: PaymentInfo): Promise<PaymentPlatformReponse>;
}