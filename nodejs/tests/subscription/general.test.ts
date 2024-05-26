import { IPaymentService } from '../../src/core/interfaces/payment-service.interface';
import { OrderService } from '../../src/core';
import { PaymentPlatformReponse } from '../../src/core/dto/payment-platform-reponse.dto';
import { Order } from '../../src/core/models/order';
import { PaymentInfo } from '../../src/core/models/payment-info';
import { IOrderRepository } from '../../src/core/interfaces/order.repository.interface';

const requestBody: Order = JSON.parse(`{
    "buyerInfo": {
        "firstName": "Fulano",
        "lastName": "de Tal",
        "birthDate": "1984-08-01",
        "fiscalIdentificationNumber": "12345678901",
        "email": "sb-brznd30619124@personal.example.com",
        "phone": "12324423434535"
    },
    "currency": "BRL",
    "shoppingCart": {
        "items": [
            {
                "sku": "SKU1234",
                "quantity": 1,
                "price": 129.00,
                "tax": 1,
                "shipping": 0,
                "insurance": 0,
                "handlingFee": 0,
                "shippingDiscount": 0,
                "discount": 0,
                "name": "Produto 1234",
                "description": "Produto 1234 - XPTO - ABCD"
            },
            {
                "sku": "SKU5678",
                "quantity": 1,
                "price": 520.00,
                "tax": 1,
                "shipping": 0,
                "insurance": 0,
                "handlingFee": 0,
                "shippingDiscount": 0,
                "discount": 0,
                "name": "Produto 5678",
                "description": "Produto 5678 - XPTO - ABCD"
            }
        ]
    },
    "shippingAddress": {
        "postalCode": "09123456",
        "street": "Rua de teste, 404",
        "district": "Teste",
        "city": "Sao Paulo",
        "state": "Sap Paulo",
        "countryCode": "BR"
    }
}`);

const responseBody: Order = requestBody;

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