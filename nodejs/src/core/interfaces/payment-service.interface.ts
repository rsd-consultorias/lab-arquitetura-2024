import { PaymentPlatformReponse } from "../dto/payment-platform-reponse.dto";
import { Transaction } from "../models/transaction";
import { PaymentInfo } from "../models/payment-info";

export interface IPaymentService {
    createPaymentRequest(transaction: Transaction): Promise<PaymentPlatformReponse>;
    executePaymentRequest(paymentInfo: PaymentInfo): Promise<PaymentPlatformReponse>;
}