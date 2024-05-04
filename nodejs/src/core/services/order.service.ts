import { nextOrderToken } from "../domain/token.domain";
import { IPaymentService } from "../interfaces/payment-service.interface";
import { Order } from "../models/order";
import { IOrderRepository } from "../interfaces/order.repository.interface";
import { PaymentInfo } from "../models/payment-info";
import { OrderState } from "../enums";

export class OrderService {

    constructor(
        private paymentService: IPaymentService,
        private orderRepository: IOrderRepository) { }

    public async createOrder(order: Order): Promise<Order> {
        order.orderState! = OrderState.PENDING;
        order.paymentInfo! = { token: nextOrderToken() } as PaymentInfo;

        // TODO: Creates account if not exists, otherwise returns existing account
        let payment = await this.paymentService.createPaymentRequest(order);
        await this.orderRepository.saveCreatedOrder(order, payment);

        return order;
    }
}