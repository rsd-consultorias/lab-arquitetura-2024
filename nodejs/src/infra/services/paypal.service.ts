export module PayPal {
    export class PayPalService {
        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @document https://developer.paypal.com/docs/regional/br/create-payment-request/
         */
        public async createPaymentRequest(paymentRequest: dto.PayPalDTO): Promise<dto.PayPalDTO> {
            return {} as dto.PayPalDTO;
        }

        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @document https://developer.paypal.com/docs/regional/br/update-selection-page/
         */
        public async updatePaymentRequest(paymentRequest: dto.PayPalDTO): Promise<dto.PayPalDTO> {
            return {} as dto.PayPalDTO;
        }

        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @document https://developer.paypal.com/docs/regional/br/order-review-page/
         */
        public async reviewOrder(paymentRequest: dto.PayPalDTO): Promise<dto.PayPalDTO> {
            return {} as dto.PayPalDTO;
        }

        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @document https://developer.paypal.com/docs/regional/br/test-and-execute/
         */
        public async executeOrder(paymentRequest: dto.PayPalDTO): Promise<dto.PayPalDTO> {
            return {} as dto.PayPalDTO;
        }
    }

    export module dto {

        export interface PayPalDTO {
            id: string;
            create_time: string;
            update_time: string;
            state: string;
            intent: string;
            payer: Payer;
            transactions: Transaction[];
            redirect_urls: RedirectUrls;
            links: Link[];
        }

        export interface Payer {
            payment_method: string;
            payer_info: PayerInfo;
        }

        export interface PayerInfo {
            shipping_address: ShippingAddress;
        }

        export interface Transaction {
            amount: Amount;
            description: string;
            payment_options: PaymentOptions;
            item_list: ItemList;
        }

        export interface Amount {
            currency: string;
            total: string;
            details: Details;
        }

        export interface Details {
            shipping: string;
            subtotal: string;
            shipping_discount: string;
            insurance: string;
            handling_fee: string;
            tax: string;
        }

        export interface PaymentOptions {
            allowed_payment_method: string;
        }

        export interface ItemList {
            shipping_address: ShippingAddress;
            items: Item[];
        }

        export interface ShippingAddress {
            recipient_name: string;
            line1: string;
            line2: string;
            city: string;
            country_code: string;
            postal_code: string;
            state: string;
            phone: string;
        }

        export interface Item {
            name: string;
            description: string;
            quantity: string;
            price: string;
            tax: string;
            sku: string;
            currency: string;
        }

        export interface RedirectUrls {
            return_url: string;
            cancel_url: string;
        }

        export interface Link {
            href: string
            rel: string
            method: string
        }
    }
}