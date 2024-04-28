import { ParamsDictionary } from "express-serve-static-core";
import { Address } from "../core/models/address";
import { CheckoutSummary } from "../core/models/checkout-summary";
import { PaymentOption } from "../core/models/payment-option";
import { ShoppingCart } from "../core/models/shopping-cart";
import { IHttpServer } from "../infra/http-server";
import { APIResponse } from "../view-models/api-response";
import { CheckoutRepository } from "../infra/repositories/checkout-repository";

const CHECKOUT_URL_API = '/v1/checkout';

export class CheckoutController {

    constructor(private checkoutRepository: CheckoutRepository, private httpServer: IHttpServer) {
        // INFO: creates checkout transaction
        httpServer.register(`${CHECKOUT_URL_API}/create`, 'post',
            async (params: ParamsDictionary, body: ShoppingCart) => {
                let apiResponse = new APIResponse<CheckoutSummary>(true, undefined);

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
            async (params: ParamsDictionary, body: PaymentOption): Promise<APIResponse<CheckoutSummary>> => {
                let transactionId = params['transactionId'];
                let checkoutSummary = await this.checkoutRepository.updatePaymentOption(transactionId, body);
                checkoutSummary.paymentOption = body;

                let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, checkoutSummary);

                return apiResponse;
            });

        // INFO: lists checkout details
        httpServer.register(`${CHECKOUT_URL_API}/:transactionId`, 'get', async (params: ParamsDictionary) => {
            let transactionId = params['transactionId'];
            let checkoutSummary = await this.checkoutRepository.findByTransactionId(transactionId);

            let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, checkoutSummary);

            return apiResponse;
        });

        // INFO: finalizes checkout
        httpServer.register(`${CHECKOUT_URL_API}/:transactionId/finalize`, 'post',
            async (params: ParamsDictionary, body: CheckoutSummary) => {
                let transactionId = params['transactionId'];
                let checkoutSummary = await this.checkoutRepository.findByTransactionId(transactionId);

                let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, checkoutSummary);

                return apiResponse;
            }
        );
    }
}