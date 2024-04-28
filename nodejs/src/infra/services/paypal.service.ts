import { IPaymentService } from "src/core/services/payment-service.interface";
import { Configuration } from "../../configuration";

export module PayPal {
    export class PayPalService implements IPaymentService {

        constructor() { }

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
        public async createPaymentRequest(paymentRequest: dto.PayPalDTO): Promise<dto.PayPalDTO> {
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
            try {
                response = await request.json();
            }
            catch (error) {
                console.warn(error);
            }

            return response;
        }

        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @see https://developer.paypal.com/docs/regional/br/update-selection-page/
         */
        public async updatePaymentRequest(paymentRequest: dto.PayPalDTO): Promise<dto.PayPalDTO> {
            return {} as dto.PayPalDTO;
        }

        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @see https://developer.paypal.com/docs/regional/br/order-review-page/
         */
        public async reviewOrder(paymentRequest: dto.PayPalDTO): Promise<dto.PayPalDTO> {
            return {} as dto.PayPalDTO;
        }

        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @see https://developer.paypal.com/docs/regional/br/test-and-execute/
         */
        public async executeOrder(paymentRequest: dto.PayPalDTO): Promise<dto.PayPalDTO> {
            let accessToken = await this.getAccessToken();

            let request = await fetch(`${Configuration.PAYPAL_URL}/payments/payment/${paymentRequest.payer!.payer_info!.payer_id!}/execute`,
                {
                    method: 'POST',
                    body: JSON.stringify(paymentRequest),
                    headers: {
                        Authorization: `Bearer ${accessToken}`
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