import { IPaymentService } from "../../core/services/payment-service.interface";
import { Configuration } from "../../configuration";
import { CheckoutSummary } from "../../core/models/checkout-summary";
import { PaymentInfo } from "src/core/models/payment-info";

export module PayPal {
    export class PayPalService implements IPaymentService {

        constructor() { }

        async createPaymentRequest(checkoutSummary: CheckoutSummary): Promise<CheckoutSummary> {
            let newpaymentRequest = this.buildPayPalDTOFromCheckoutSummary(checkoutSummary);
            let paymentResponse = await this._createPaymentRequest(newpaymentRequest);

            checkoutSummary.paymentInfo = {
                platformPaymentId: paymentResponse.id!,
                paymentPlatform: 'paypal',
                transactionResponseBody: paymentResponse
            }

            return checkoutSummary;
        }

        async updatePaymentRequest(checkoutSummary: CheckoutSummary): Promise<CheckoutSummary> {
            throw new Error("Method not implemented.");
        }

        async reviewPaymentRequest(checkoutSummary: CheckoutSummary): Promise<CheckoutSummary> {
            throw new Error("Method not implemented.");
        }

        async executePaymentRequest(paymentInfo: PaymentInfo): Promise<any> {
            let paymentResponse = await this._executeOrder(paymentInfo.platformPaymentId!, paymentInfo.platormPayerId!);

            return paymentResponse;
        }

        private buildPayPalDTOFromCheckoutSummary(checkoutSummary: CheckoutSummary): dto.PayPalDTO {
            let payPlaRequest: dto.PayPalDTO = {};

            payPlaRequest.intent = 'sale';

            payPlaRequest.payer = {
                payment_method: 'paypal',
            };

            try {
                payPlaRequest.payer = {
                    payment_method: 'paypal',
                    payer_info: {
                        payer_id: checkoutSummary.paymentInfo!.transactionResponseBody ? ((checkoutSummary.paymentInfo!.transactionResponseBody) as dto.PayPalDTO).payer?.payer_info?.payer_id! : undefined
                    }
                };
            } catch (error) { }

            payPlaRequest.transactions = [{
                description: 'Compra loja de teste',
                payment_options: { allowed_payment_method: 'IMMEDIATE_PAY' },
                amount: {
                    total: checkoutSummary.shoppingCart.items.map((i) => (i.price * i.quantity) + i.tax! + i.handlingFee! + i.insurance! + i.shipping! - i.shippingDiscount! - i.discount!).reduce((x, y) => x + y).toFixed(2),
                    currency: 'BRL',
                    details: {
                        shipping: checkoutSummary.shoppingCart.items.map((i) => i.shipping!).reduce((x, y) => x + y).toFixed(2),
                        subtotal: checkoutSummary.shoppingCart.items.map((i) => i.price! * i.quantity!).reduce((x, y) => x + y).toFixed(2),
                        shipping_discount: checkoutSummary.shoppingCart.items.map((i) => i.shippingDiscount!).reduce((x, y) => x + y).toFixed(2),
                        insurance: checkoutSummary.shoppingCart.items.map((i) => i.insurance!).reduce((x, y) => x + y).toFixed(2),
                        handling_fee: checkoutSummary.shoppingCart.items.map((i) => i.handlingFee!).reduce((x, y) => x + y).toFixed(2),
                        tax: checkoutSummary.shoppingCart.items.map((i) => i.tax!).reduce((x, y) => x + y).toFixed(2)
                    }
                },
                item_list: {
                    shipping_address: {
                        recipient_name: '',
                        line1: checkoutSummary.shippingAddress?.street,
                        line2: checkoutSummary.shippingAddress?.district,
                        city: checkoutSummary.shippingAddress?.city,
                        country_code: checkoutSummary.shippingAddress?.countryCode,
                        postal_code: checkoutSummary.shippingAddress?.postalCode,
                        state: checkoutSummary.shippingAddress?.state,
                        phone: checkoutSummary.buyerInfo?.phone
                    },
                    items: []
                }
            }];

            checkoutSummary.shoppingCart.items.forEach(item => {
                payPlaRequest.transactions![0].item_list?.items?.push(
                    {
                        name: item.name!,
                        description: item.description!,
                        quantity: item.quantity!,
                        price: item.price.toFixed(2),
                        tax: item.tax?.toFixed(2),
                        sku: item.sku!,
                        currency: 'BRL'
                    });
            });

            payPlaRequest.redirect_urls = {
                return_url: 'http://localhost:8081/v1/checkout/approve',
                cancel_url: 'http://localhost:8081/v1/checkout/approve'
            }

            return payPlaRequest;
        }

        private async getAccessToken(): Promise<string> {
            let authKeys = Buffer.from(`${Configuration.PAYPAL_CLIENT_ID}:${Configuration.PAYPAL_CLIENT_SECRET}`).toString('base64');
            let request = await fetch(`${Configuration.PAYPAL_URL}/v1/oauth2/token`, {
                method: 'POST',
                body: 'grant_type=client_credentials',
                headers: {
                    Authorization: `Basic ${authKeys}`
                }
            });

            let response = await request.json();
            console.log(response.access_token);
            return response.access_token;
        }

        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @see https://developer.paypal.com/docs/regional/br/create-payment-request/
         */
        private async _createPaymentRequest(paymentRequest: dto.PayPalDTO): Promise<dto.PayPalDTO> {
            let accessToken = await this.getAccessToken();
            let jsonRequest = JSON.stringify(paymentRequest);

            let request = await fetch(`${Configuration.PAYPAL_URL}/v1/payments/payment`,
                {
                    method: 'POST',
                    body: jsonRequest,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": 'application/json'
                    }
                }
            );

            let response: dto.PayPalDTO = {};
            response = await request.json();

            return response;
        }

        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @see https://developer.paypal.com/docs/regional/br/update-selection-page/
         */
        private async _updatePaymentRequest(paymentRequest: dto.PayPalDTO): Promise<dto.PayPalDTO> {
            return {} as dto.PayPalDTO;
        }

        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @see https://developer.paypal.com/docs/regional/br/order-review-page/
         */
        private async _reviewOrder(paymentRequest: dto.PayPalDTO): Promise<dto.PayPalDTO> {
            return {} as dto.PayPalDTO;
        }

        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @see https://developer.paypal.com/docs/regional/br/test-and-execute/
         */
        private async _executeOrder(paymentId: string, payerId: string): Promise<dto.PayPalDTO> {
            let accessToken = await this.getAccessToken();
            let payId: string = paymentId;

            let request = await fetch(`${Configuration.PAYPAL_URL}/v1/payments/payment/${payId}/execute`,
                {
                    method: 'POST',
                    body: `{"payer_id": "${payId}"}`,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": 'application/json'
                    }
                }
            );

            let response: dto.PayPalDTO = await request.json();

            return response;
        }
    }

    export module dto {
        export interface PayPalDTO {
            id?: string;
            intent?: string;
            state?: string;
            cart?: string;
            payer?: Payer;
            transactions?: Transaction[];
            failed_transactions?: any[];
            create_time?: string;
            update_time?: string;
            links?: Link[];
            redirect_urls?: RedirectUrls;
        }

        export interface Payer {
            payment_method?: string;
            status?: string;
            payer_info?: PayerInfo;
        }

        export interface PayerInfo {
            email?: string;
            first_name?: string;
            last_name?: string;
            payer_id?: string;
            shipping_address?: ShippingAddress;
            tax_id_type?: string;
            tax_id?: string;
            country_code?: string;
        }

        export interface ShippingAddress {
            recipient_name?: string;
            line1?: string;
            line2?: string;
            city?: string;
            state?: string;
            postal_code?: string;
            country_code?: string;
            normalization_status?: string;
            phone?: string;
        }

        export interface Transaction {
            amount?: Amount;
            payee?: Payee;
            description?: string;
            soft_descriptor?: string;
            item_list?: ItemList;
            related_resources?: RelatedResource[];
            payment_options?: PaymentOptions;
        }

        export interface PaymentOptions {
            allowed_payment_method?: string;
        }


        export interface Amount {
            total?: string;
            currency?: string;
            details?: Details;
        }

        export interface Details {
            subtotal?: string;
            tax?: string;
            shipping?: string;
            insurance?: string;
            handling_fee?: string;
            shipping_discount?: string;
            discount?: string;
        }

        export interface Payee {
            merchant_id?: string;
            email?: string;
        }

        export interface ItemList {
            items?: Item[];
            shipping_address?: ShippingAddress;
            shipping_phone_number?: string;
        }

        export interface Item {
            name?: string;
            sku?: string;
            description?: string;
            price?: string;
            currency?: string;
            tax?: string;
            quantity?: number;
            image_url?: string;
        }

        export interface RelatedResource {
            sale?: Sale;
        }

        export interface Sale {
            id?: string;
            state?: string;
            amount?: Amount;
            payment_mode?: string;
            protection_eligibility?: string;
            protection_eligibility_type?: string;
            transaction_fee?: TransactionFee;
            parent_payment?: string;
            create_time?: string;
            update_time?: string;
            links?: Link[];
            soft_descriptor?: string;
        }

        export interface TransactionFee {
            value?: string;
            currency?: string;
        }

        export interface Link {
            href?: string;
            rel?: string;
            method?: string;
        }

        export interface RedirectUrls {
            return_url?: string;
            cancel_url?: string;
        }
    }
}