import { ParamsDictionary } from "express-serve-static-core";
import { Address } from "../core/models/address";
import { CheckoutSummary } from "../core/models/checkout-summary";
import { PaymentOption } from "../core/models/payment-option";
import { ShoppingCart } from "../core/models/shopping-cart";
import { IHttpServer } from "../infra/http-server";
import { APIResponse } from "../view-models/api-response";
import { randomUUID } from "crypto";

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

    private async createTransaction(params: ParamsDictionary, body: ShoppingCart): Promise<APIResponse<CheckoutSummary>> {
        let summary = new CheckoutSummary(randomUUID(), "John Doe", new Date('1984-08-01'), '123456', body);

        let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, summary);

        return apiResponse;
    }

    private async addPayment(params: ParamsDictionary, body: PaymentOption): Promise<APIResponse<CheckoutSummary>> {
        let transactionId = params['transactionId'];
        let shoppingCart = new ShoppingCart(transactionId, [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let summary = new CheckoutSummary(transactionId, "John Doe", new Date('1984-08-01'), '123456', shoppingCart);
        summary.paymentOption = body;

        let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, summary);

        return apiResponse;
    }

    private async addShippingAddress(params: ParamsDictionary, body: Address): Promise<APIResponse<CheckoutSummary>> {
        let transactionId = params['transactionId'];
        let shoppingCart = new ShoppingCart(transactionId, [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let summary = new CheckoutSummary(transactionId, "John Doe", new Date('1984-08-01'), '123456', shoppingCart);
        summary.shippingAddress = body;

        let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, summary);

        return apiResponse;
    }

    private async addBillingAddress(params: ParamsDictionary, body: Address): Promise<APIResponse<CheckoutSummary>> {
        let transactionId = params['transactionId'];
        let shoppingCart = new ShoppingCart(transactionId, [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let summary = new CheckoutSummary(transactionId, "John Doe", new Date('1984-08-01'), '123456', shoppingCart);
        summary.billingAddress = body;

        let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, summary);

        return apiResponse;
    }

    private async getDetails(params: ParamsDictionary): Promise<APIResponse<CheckoutSummary>> {
        let transactionId = params['transactionId'];
        let shoppingCart = new ShoppingCart(transactionId, [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let summary = new CheckoutSummary(transactionId, "John Doe", new Date('1984-08-01'), '123456', shoppingCart);

        let apiResponse = new APIResponse<CheckoutSummary>(true, undefined, summary);

        return apiResponse;
    }

    private async finalizeCheckout(params: ParamsDictionary, body: CheckoutSummary): Promise<APIResponse<CheckoutSummary>> {
        let transactionId = params['transactionId'];

        return new APIResponse(false, `NOT IMPLEMENTED`);
    }
}