import { nextOrderToken } from "../domain/token.domain";
import { IPaymentService } from "../interfaces/payment-service.interface";
import { Order } from "../models/entities/order";
import { IOrderRepository } from "../interfaces/order.repository.interface";
import { OrderState } from "../enums";
import { CreateOrderError } from "../domain/order.errors";

export class OrderService {

    constructor(
        private paymentService: IPaymentService,
        private orderRepository: IOrderRepository) { }

    public async createOrder(order: Order): Promise<Order> {
        // Validations
        if (!order.isValid()) {
            throw new CreateOrderError(order.getErrors().reduce((x: string, y: string) => x.concat(' ').concat(y)));
        }

        order.orderState = OrderState.PENDING;

        // TODO: Creates account if not exists, otherwise returns existing account
        let payment = await this.paymentService.createPaymentRequest(order);
        payment.paymentInfo!.token = nextOrderToken();
        order.paymentInfoId = payment.paymentInfo!.id;

        return await this.orderRepository.saveCreatedOrder(order, payment);
    }
}