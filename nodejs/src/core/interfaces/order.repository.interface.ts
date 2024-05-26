import { PaymentPlatformReponse } from "../dto/payment-platform-reponse.dto";
import { Order } from "../models/order";

export interface IOrderRepository {
    saveCreatedOrder(order: Order, platformResponse: PaymentPlatformReponse): Promise<Order>;
    findByToken(token: string): Promise<Order>;
    finalize(token: string, platformResponse: PaymentPlatformReponse): Promise<Order>;
}