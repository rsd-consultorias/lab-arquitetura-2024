import { PaymentInfo } from "core/models/entities/payment-info";
import { PaymentPlatformReponse } from "../dto/payment-platform-reponse.dto";
import { Order } from "../models/entities/order";

export interface IOrderRepository {
    saveCreatedOrder(order: Order, platformResponse: PaymentPlatformReponse): Promise<Order>;
    findByTokenAndCustomerInfoId(token: string, customerInfoId: string): Promise<Order>;
    findPaymentInfoById(id: string): Promise<PaymentInfo>;
    finalize(token: string, customerInfoId: string, platformResponse: PaymentPlatformReponse): Promise<Order>;
}