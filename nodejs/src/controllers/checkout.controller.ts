import { ParamsDictionary } from "express-serve-static-core";
import { Address } from "../core/models/address";
import { CheckoutState, CheckoutSummary } from "../core/models/checkout-summary";
import { IPaymentService } from "../core/interfaces/payment-service.interface";
import { PaymentInfo } from "../core/models/payment-info";
import { IHttpServer } from "../infra/http-server";
import { APIResponse } from "../view-models/api-response";
import { CheckoutRepository } from "../infra/repositories/checkout-repository";
import { AccountQueueService } from "../infra/message-broker/account.queue";
import { SubscriptionQueueService } from "../infra/message-broker/subscription.queue";
import { randomUUID } from "crypto";

const CHECKOUT_URL_API = '/v1/checkout';

export class CheckoutController {

    constructor(
        private checkoutRepository: CheckoutRepository,
        private accountQueue: AccountQueueService,
        private subscriptionQueue: SubscriptionQueueService,
        private paymentService: IPaymentService,
        private httpServer: IHttpServer) {

        // INFO: creates checkout transaction
        httpServer.register(`${CHECKOUT_URL_API}/create`, 'post',
            async (params: ParamsDictionary, body: CheckoutSummary) => {
                try {
                    let checkoutSummary: CheckoutSummary = body;
                    checkoutSummary.checkoutState = CheckoutState.PENDING;
                    let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, checkoutSummary);
                    checkoutSummary.transactionId = randomUUID();

                    // Creates account if not exists, otherwise returns existing account
                    // let accountResponse = await this.accountQueue.sendbuyerInfoToAccountVerification(checkoutSummary.buyerInfo!);
                    let paymentResponse = await paymentService.createPaymentRequest(checkoutSummary);

                    this.checkoutRepository.saveCreatedCheckout(paymentResponse.checkoutSummary!, paymentResponse.platformResponse!);
                    apiResponse.body = paymentResponse.checkoutSummary;

                    return apiResponse;
                } catch (error) {
                    console.error(error);
                    return new APIResponse<CheckoutSummary>(false, 'INTERNAL_SERVER_ERROR');
                }
            });

        // INFO: lists checkout details
        httpServer.register(`${CHECKOUT_URL_API}/:transactionId`, 'get',
            async (params: ParamsDictionary) => {
                try {
                    let transactionId = params['transactionId'];
                    let checkoutSummary = await this.checkoutRepository.findByTransactionId(transactionId);

                    return new APIResponse<CheckoutSummary>(true, undefined, checkoutSummary);
                } catch (error) {
                    console.error(error);
                    return new APIResponse<CheckoutSummary>(false, 'INTERNAL_SERVER_ERROR');
                }
            });

        // INFO: finalizes checkout
        httpServer.register(`${CHECKOUT_URL_API}/:transactionId/finalize`, 'post',
            async (params: ParamsDictionary, body: PaymentInfo) => {
                try {
                    let transactionId = params['transactionId'];
                    let paymentInfo = body;

                    // call payment service
                    let plaftformResponse = (await this.paymentService.executePaymentRequest(paymentInfo!)).platformResponse;
                    let checkoutSummary = await this.checkoutRepository.finalize(transactionId, plaftformResponse);

                    // sends data to start processing the order
                    // let subscriptionReponse = await this.subscriptionQueue.sendShoppingCartToFinalizeSubscription(checkoutSummary.shoppingCart);

                    return new APIResponse<CheckoutSummary>(true, undefined, checkoutSummary);
                } catch (error) {
                    console.error(error);
                    return new APIResponse<CheckoutSummary>(false, 'INTERNAL_SERVER_ERROR');
                }
            }
        );
    }
}