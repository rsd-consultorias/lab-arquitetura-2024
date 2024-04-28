import { ParamsDictionary } from "express-serve-static-core";
import { Address } from "../core/models/address.model";
import { CheckoutSummary } from "../core/models/checkout-summary.model";
import { PaymentOption } from "../core/models/payment-option.model";
import { ShoppingCart } from "../core/models/shopping-cart.model";
import { IHttpServer } from "../infra/http-server.interface";
import { APIResponse } from "../view-models/api-response.view-model";

export class CheckoutController {
    private readonly URL_API = '/v1/checkout';

    constructor(readonly httpServer: IHttpServer) {
        httpServer.register(`${this.URL_API}/create`, 'post', this.createTransaction);
        httpServer.register(`${this.URL_API}/:transactionId/payment-option`, 'put', this.addPayment);
        httpServer.register(`${this.URL_API}/:transactionId/shipping-address`, 'put', this.addShippingAddress);
        httpServer.register(`${this.URL_API}/:transactionId/billing-adddress`, 'put', this.addBillingAddress);
        httpServer.register(`${this.URL_API}/:transactionId`, 'get', this.getDetails);
        httpServer.register(`${this.URL_API}/:transactionId/finalize`, 'post', this.finalizeCheckout);
    }

    private async createTransaction(params: ParamsDictionary, body: ShoppingCart): Promise<APIResponse> {
        return new APIResponse(false, `NOT IMPLEMENTED`);
    }

    private async addPayment(params: ParamsDictionary, body: PaymentOption): Promise<APIResponse> {
        let transactionId = params['transactionId'];

        return new APIResponse(false, `NOT IMPLEMENTED`);
    }

    private async addShippingAddress(params: ParamsDictionary, body: Address): Promise<APIResponse> {
        let transactionId = params['transactionId'];
        
        return new APIResponse(false, `NOT IMPLEMENTED`);
    }

    private async addBillingAddress(params: ParamsDictionary, body: Address): Promise<APIResponse> {
        let transactionId = params['transactionId'];

        return new APIResponse(false, `NOT IMPLEMENTED`);
    }

    private async getDetails(params: ParamsDictionary): Promise<APIResponse> {
        let transactionId = params['transactionId'];

        return new APIResponse(false, `NOT IMPLEMENTED: ${params['transactionId']}`);
    }

    private async finalizeCheckout(params: ParamsDictionary, body: CheckoutSummary) {
        let transactionId = params['transactionId'];
        
        return new APIResponse(false, `NOT IMPLEMENTED`);
    }
}