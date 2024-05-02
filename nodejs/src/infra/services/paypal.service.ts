import { IPaymentService } from "../../core/interfaces/payment-service.interface";
import { Configuration } from "../../configuration";
import { CheckoutSummary } from "../../core/models/checkout-summary";
import { PaymentInfo } from "../../core/models/payment-info";
import { PaymentPlatformReponse } from "src/core/dto/payment-platform-reponse.dto";

export module PayPal {
    export module v1 {
        export class PayPalService implements IPaymentService {

            constructor() { }

            async createPaymentRequest(checkoutSummary: CheckoutSummary): Promise<PaymentPlatformReponse> {
                let newpaymentRequest = this.buildPayPalDTOFromCheckoutSummary(checkoutSummary);
                let platformResponse = await this._createPaymentRequest(newpaymentRequest);

                return { checkoutSummary: checkoutSummary, platformResponse: platformResponse } as PaymentPlatformReponse;
            }

            async executePaymentRequest(paymentInfo: PaymentInfo): Promise<PaymentPlatformReponse> {
                let platformResponse = await this._executeOrder(paymentInfo.platformPaymentId!, paymentInfo.platormPayerId!);

                if (platformResponse.state! !== 'approved') {
                    platformResponse = await this._getOrderDetails(paymentInfo.platformPaymentId!);
                }

                return { paymentInfo: paymentInfo, platformResponse: platformResponse };
            }

            private buildPayPalDTOFromCheckoutSummary(checkoutSummary: CheckoutSummary): dto.PayPalDTO {
                let payPlaRequest: dto.PayPalDTO = {};

                payPlaRequest.intent = 'sale';

                payPlaRequest.payer = {
                    payment_method: 'paypal',
                };

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
                    return_url: Configuration.CHECKOUT_APPROVED_URL,
                    cancel_url: Configuration.CHECKOUT_CANCELED_URL
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
             * @param paymentId 
             * @see https://api.sandbox.paypal.com/v1/payments/payment/:payID
             */
            private async _getOrderDetails(paymentId: string): Promise<dto.PayPalDTO> {
                let accessToken = this.getAccessToken();
                let request = await fetch(`${Configuration.PAYPAL_URL}/v1/payments/payment/${paymentId}`, {
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                return await request.json() as dto.PayPalDTO;
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
             * @see https://developer.paypal.com/docs/regional/br/test-and-execute/
             */
            private async _executeOrder(paymentId: string, payerId: string): Promise<dto.PayPalDTO> {
                let accessToken = await this.getAccessToken();

                let request = await fetch(Configuration.PAYPAL_URL + "/v1/payments/payment/" + paymentId + "/execute",
                    {
                        method: 'POST',
                        body: `{"payer_id": "${payerId}"}`,
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

    export module v2 {
        export class PayPalService implements IPaymentService {
            public async createPaymentRequest(checkoutSummary: CheckoutSummary): Promise<CheckoutSummary> {
                throw new Error("Method not implemented.");
            }

            public async updatePaymentRequest(checkoutSummary: CheckoutSummary): Promise<CheckoutSummary> {
                throw new Error("Method not implemented.");
            }

            public async reviewPaymentRequest(checkoutSummary: CheckoutSummary): Promise<CheckoutSummary> {
                throw new Error("Method not implemented.");
            }

            public async executePaymentRequest(paymentInfo: PaymentInfo): Promise<any> {
                throw new Error("Method not implemented.");
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

            private async createOrder(purchaseUnits: types.PurchaseUnit[], paymentSource: types.PaymentSource): Promise<types.Order> {

                return {} as types.Order;
            }
        }

        export module types {

            export interface Order {
                id: string;
                intent: string;
                status: string;
                payment_source: PaymentSource;
                purchase_units: PurchaseUnit[];
                payer: Payer;
                create_time: string;
                update_time: string;
                links: Link[];
                credit_financing_offer: CreditFinancingOffer;
            }

            export interface CreditFinancingOffer {
                issuer: string;
                total_payment: Amount;
                installment_details: InstallmentDetails;
                term: number;
            }

            export interface InstallmentDetails {
                period: string;
                interval_duration: string;
                payment_due: Amount;
            }

            export interface Payer {
                name: Name;
                email_address: string;
                payer_id: string;
                address: Address;
            }

            export interface PurchaseUnit {
                reference_id: string;
                amount: Amount;
                payee: Payee;
                soft_descriptor: string;
                shipping: Shipping;
                payments: Payments;
            }

            export interface Payments {
                captures: Capture[];
            }

            export interface Capture {
                id: string;
                status: string;
                amount: Amount;
                final_capture: boolean;
                seller_protection: SellerProtection;
                seller_receivable_breakdown: SellerReceivableBreakdown;
                links: Link[];
                create_time: string;
                update_time: string;
            }

            export interface Link {
                href: string;
                rel: string;
                method: string;
            }

            export interface SellerReceivableBreakdown {
                gross_amount: Amount;
                paypal_fee: Amount;
                net_amount: Amount;
            }

            export interface SellerProtection {
                status: string;
                dispute_categories: string[];
            }

            export interface Shipping {
                name: Name;
                address: Address;
                type: string;
            }

            export interface Payee {
                email_address: string;
                merchant_id: string;
                display_data: DisplayData;
            }

            export interface DisplayData {
                brand_name: string;
            }

            export interface Amount {
                currency_code: string;
                value: string;
            }

            export interface PaymentSource {
                paypal: Paypal;
            }

            export interface Paypal {
                email_address: string;
                account_id: string;
                account_status: string;
                name: Name;
                tax_info: TaxInfo;
                address: Address;
            }

            export interface Address {
                country_code: string;
            }

            export interface TaxInfo {
                tax_id: string;
                tax_id_type: string;
            }

            export interface Name {
                given_name: string;
                surname: string;
                full_name: string;
            }
        }
    }
}