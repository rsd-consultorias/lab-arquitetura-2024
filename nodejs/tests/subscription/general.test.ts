import { IPaymentService } from '../../src/core/interfaces/payment-service.interface';
import { OrderService } from '../../src/core';
import { PaymentPlatformReponse } from '../../src/core/dto/payment-platform-reponse.dto';
import { Order } from '../../src/core/models/order';
import { PaymentInfo } from '../../src/core/models/payment-info';
import { IOrderRepository } from '../../src/core/interfaces/order.repository.interface';
import { makeValidOrder, makeInvalidOrder } from './factories';

const requestBody: Order = makeValidOrder();
const responseBody: Order = makeValidOrder();

var orderService: OrderService;
var paymentService: IPaymentService = {
    createPaymentRequest: async function (order: Order): Promise<PaymentPlatformReponse> {
        return {};
    },
    executePaymentRequest: async function (paymentInfo: PaymentInfo): Promise<PaymentPlatformReponse> {
        return {};
    }
};
var orderRepository: IOrderRepository = {
    saveCreatedOrder: async function (order: Order, platformResponse: PaymentPlatformReponse): Promise<Order> {
        return responseBody;
    },
    findByToken: async function (token: string): Promise<Order> {
        return responseBody;
    },
    finalize: async function (token: string, platformResponse: PaymentPlatformReponse): Promise<Order> {
        return responseBody;
    }
};


orderService = new OrderService(paymentService, orderRepository);

describe('Criar novo pedido com sucesso', () => {

    test('', async () => {
        let created = await orderService.createOrder(requestBody);
        expect(created).not.toBeNull();
    });
});