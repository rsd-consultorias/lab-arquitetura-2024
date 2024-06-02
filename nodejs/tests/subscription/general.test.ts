import { IPaymentService } from '../../src/core/interfaces/payment-service.interface';
import { OrderService } from '../../src/core';
import { PaymentPlatformReponse } from '../../src/core/dto/payment-platform-reponse.dto';
import { Order } from '../../src/core/models/entities/order';
import { PaymentInfo } from '../../src/core/models/entities/payment-info';
import { IOrderRepository } from '../../src/core/interfaces/order.repository.interface';
import { makeValidOrder, makeInvalidOrder } from './factories';
import { randomUUID } from 'crypto';

const requestBody: Order = makeValidOrder();
const responseBody: Order = makeValidOrder();

var orderService: OrderService;
var paymentService: IPaymentService = {
    createPaymentRequest: async function (order: Order): Promise<PaymentPlatformReponse> {
        let paymentResponse = new PaymentPlatformReponse();
        paymentResponse.paymentInfo = new PaymentInfo();
        paymentResponse.paymentInfo.platformPaymentId = randomUUID();
        paymentResponse.paymentInfo.platormPayerId = randomUUID();
        paymentResponse.paymentInfo.platformToken = randomUUID();
        paymentResponse.paymentInfo.paymentPlatform = 'PAYPAL';
        paymentResponse.order = order;

        return paymentResponse;
    },
    executePaymentRequest: async function (paymentInfo: PaymentInfo): Promise<PaymentPlatformReponse> {
        return {};
    }
};
var orderRepository: IOrderRepository = {
    saveCreatedOrder: async function (order: Order, platformResponse: PaymentPlatformReponse): Promise<Order> {
        return responseBody;
    },
    findByTokenAndCustomerInfoId: async function (token: string): Promise<Order> {
        return responseBody;
    },
    findPaymentInfoById: async function (id: string): Promise<PaymentInfo> {
        return {} as PaymentInfo;
    },
    finalize: async function (token: string, customerInfoId: string, platformResponse: PaymentPlatformReponse): Promise<Order> {
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