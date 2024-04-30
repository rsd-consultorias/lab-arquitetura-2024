import { ParamsDictionary } from "express-serve-static-core";
import { Address } from "../core/models/address";
import { CheckoutSummary } from "../core/models/checkout-summary";
import { IPaymentService } from "../core/services/payment-service.interface";
import { PaymentInfo } from "../core/models/payment-info";
import { IHttpServer } from "../infra/http-server";
import { APIResponse } from "../view-models/api-response";
import { CheckoutRepository } from "../infra/repositories/checkout-repository";
import { AccountQueueService } from "../infra/message-broker/account.queue";
import { SubscriptionQueueService } from "../infra/message-broker/subscription.queue";

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
                    let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, checkoutSummary);

                    // Creates account if not exists, otherwise returns existing account
                    let accountResponse = await this.accountQueue.sendbuyerInfoToAccountVerification(checkoutSummary.buyerInfo!);

                    let paymentResponse: CheckoutSummary = await paymentService.createPaymentRequest(checkoutSummary);
                    apiResponse.body = paymentResponse;

                    return apiResponse;
                } catch (error) {
                    return new APIResponse<CheckoutSummary>(false, 'INTERNAL_SERVER_ERROR');
                }
            });

        // INFO: updates shipping address
        httpServer.register(`${CHECKOUT_URL_API}/:transactionId/shipping-address`, 'put',
            async (params: ParamsDictionary, body: Address): Promise<APIResponse<CheckoutSummary>> => {
                let transactionId = params['transactionId'];
                let checkoutSummary = await this.checkoutRepository.updateShippingAddress(transactionId, body);

                let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, checkoutSummary);

                return apiResponse;
            });

        // INFO: updates billing address
        httpServer.register(`${CHECKOUT_URL_API}/:transactionId/billing-adddress`, 'put',
            async (params: ParamsDictionary, body: Address): Promise<APIResponse<CheckoutSummary>> => {
                let transactionId = params['transactionId'];
                let checkoutSummary = await this.checkoutRepository.updateBillingAddress(transactionId, body);

                let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, checkoutSummary);

                return apiResponse;
            });

        // INFO: updates payment method 
        httpServer.register(`${CHECKOUT_URL_API}/:transactionId/payment-option`, 'put',
            async (params: ParamsDictionary, body: PaymentInfo): Promise<APIResponse<CheckoutSummary>> => {
                let transactionId = params['transactionId'];
                let checkoutSummary = await this.checkoutRepository.updatePaymentInfo(transactionId, body);
                checkoutSummary.paymentInfo = body;

                let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, checkoutSummary);

                return apiResponse;
            });

        // INFO: approve payment webhook
        httpServer.register(`${CHECKOUT_URL_API}/approve`, 'get',
            async (params: Request, body: any, query: ParamsDictionary) => {
                console.log(JSON.stringify(query));

                return JSON.stringify(query);
            }
        );

        // INFO: lists checkout details
        httpServer.register(`${CHECKOUT_URL_API}/:transactionId`, 'get',
            async (params: ParamsDictionary) => {
                try {
                    let transactionId = params['transactionId'];
                    let checkoutSummary = await this.checkoutRepository.findByTransactionId(transactionId);

                    let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, checkoutSummary);

                    return apiResponse;
                } catch (error) {
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
                    paymentInfo!.transactionResponseBody = await this.paymentService.executePaymentRequest(paymentInfo!);

                    // sends data to start the signatures
                    // let subscriptionReponse = await this.subscriptionQueue.sendShoppingCartToFinalizeSubscription(checkoutSummary.shoppingCart);
                    // checkoutSummary = await this.checkoutRepository.finalize(transactionId);

                    let apiResponse = new APIResponse<CheckoutSummary>(true);

                    return apiResponse;
                } catch (error) {
                    return new APIResponse<CheckoutSummary>(false, 'INTERNAL_SERVER_ERROR');
                }
            }
        );
    }
}