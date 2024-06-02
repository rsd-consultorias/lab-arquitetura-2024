import { ParamsDictionary } from "express-serve-static-core";
import { Order } from "../../core/models/entities/order";
import { IPaymentService } from "../../core/interfaces/payment-service.interface";
import { PaymentInfo } from "../../core/models/entities/payment-info";
import { IHttpServer } from "../infra/http-server";
import { APIResponse } from "../view-models/api-response";
import { AccountQueueService } from "../infra/message-broker/account-queue.service";
import { InvoicingQueueService } from "../infra/message-broker/invoicing-queue.service";
import { OrderService } from "../../core/services/order.service";
import { IOrderRepository } from "../../core/interfaces/order.repository.interface";

const CONTROLLER_URL = '/v1';

export class OrderController {

    constructor(
        private orderRepository: IOrderRepository,
        private accountQueue: AccountQueueService,
        private subscriptionQueue: InvoicingQueueService,
        private paymentService: IPaymentService,
        private httpServer: IHttpServer) {

        let orderService = new OrderService(paymentService, orderRepository);

        // INFO: creates order
        httpServer.register(`${CONTROLLER_URL}`, 'post',
            async (params: ParamsDictionary, body: Order) => {
                try {
                    let order: Order = body;
                    order = await orderService.createOrder(order);

                    return new APIResponse<Order>(true, undefined, order);
                } catch (error) {
                    console.error(error);
                    return new APIResponse<Order>(false, 'INTERNAL_SERVER_ERROR');
                }
            });

        // INFO: lists order details
        httpServer.register(`${CONTROLLER_URL}/:token`, 'get',
            async (params: ParamsDictionary) => {
                try {
                    let token = params['token'];
                    let order = await this.orderRepository.findByTokenAndCustomerInfoId(token);

                    return new APIResponse<Order>(true, undefined, order);
                } catch (error) {
                    console.error(error);
                    return new APIResponse<Order>(false, 'INTERNAL_SERVER_ERROR');
                }
            });

        // INFO: finalizes order
        httpServer.register(`${CONTROLLER_URL}/:token/finalize`, 'post',
            async (params: ParamsDictionary, body: PaymentInfo) => {
                try {
                    let token = params['token'];
                    let paymentInfo = body;

                    // call payment service
                    let plaftformResponse = (await this.paymentService.executePaymentRequest(paymentInfo!));
                    let order = await this.orderRepository.finalize(token, plaftformResponse);

                    // sends data to start processing the order
                    // let subscriptionReponse = await this.subscriptionQueue.sendShoppingCartToFinalizeSubscription(transaction.shoppingCart);

                    return new APIResponse<Order>(true, undefined, order);
                } catch (error) {
                    console.error(error);
                    return new APIResponse<Order>(false, 'INTERNAL_SERVER_ERROR');
                }
            }
        );
    }
}