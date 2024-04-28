import { ParamsDictionary } from "express-serve-static-core";
import { Address } from "../core/models/address";
import { CheckoutSummary } from "../core/models/checkout-summary";
import { PaymentInfo } from "../core/models/payment-info";
import { ShoppingCart } from "../core/models/shopping-cart";
import { IHttpServer } from "../infra/http-server";
import { APIResponse } from "../view-models/api-response";
import { CheckoutRepository } from "../infra/repositories/checkout-repository";
import { AccountQueueService } from "../infra/message-broker/account.queue";
import { SubscriptionQueueService } from "../infra/message-broker/subscription.queue";
import { PayPal } from "../infra/services/paypal.service";

const CHECKOUT_URL_API = '/v1/checkout';

export class CheckoutController {

    constructor(
        private checkoutRepository: CheckoutRepository, 
        private accountQueue: AccountQueueService,
        private subscriptionQueue: SubscriptionQueueService,
        private httpServer: IHttpServer) {
        // INFO: creates checkout transaction
        httpServer.register(`${CHECKOUT_URL_API}/create`, 'post',
            async (params: ParamsDictionary, body: ShoppingCart) => {
                let apiResponse = new APIResponse<CheckoutSummary>(true, undefined);

                // Creates account if not exists, otherwise returns existing account
                let accountResponse = await this.accountQueue.sendbuyerInfoToAccountVerification(body.buyerInfo);

                return apiResponse;
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

        // INFO: lists checkout details
        httpServer.register(`${CHECKOUT_URL_API}/:transactionId`, 'get', async (params: ParamsDictionary) => {
            let transactionId = params['transactionId'];
            let checkoutSummary = await this.checkoutRepository.findByTransactionId(transactionId);

            let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, checkoutSummary);

            let a = new PayPal.PayPalService();
            await a.createPaymentRequest({} as PayPal.dto.PayPalDTO);

            return apiResponse;
        });

        // INFO: finalizes checkout
        httpServer.register(`${CHECKOUT_URL_API}/:transactionId/finalize`, 'post',
            async (params: ParamsDictionary, body: CheckoutSummary) => {
                let transactionId = params['transactionId'];
                let checkoutSummary = await this.checkoutRepository.findByTransactionId(transactionId);

                // call payment service

                // sends data to start the signatures
                let subscriptionReponse = await this.subscriptionQueue.sendShoppingCartToFinalizeSubscription(checkoutSummary.shoppingCart);
                checkoutSummary = await this.checkoutRepository.finalize(transactionId);

                let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, checkoutSummary);


                return apiResponse;
            }
        );
    }
}