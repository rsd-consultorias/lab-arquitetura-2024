export module PayPal {
    export class PayPalService {
        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @document https://developer.paypal.com/docs/regional/br/create-payment-request/
         */
        public async createPaymentRequest(paymentRequest: any): Promise<any> {
            return null;
        }

        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @document https://developer.paypal.com/docs/regional/br/update-selection-page/
         */
        public async updatePaymentRequest(paymentRequest: any): Promise<any> {
            return null;
        }

        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @document https://developer.paypal.com/docs/regional/br/order-review-page/
         */
        public async reviewOrder(paymentRequest: any): Promise<any> {
            return null;
        }

        /**
         * 
         * @param paymentRequest 
         * @returns 
         * @document https://developer.paypal.com/docs/regional/br/test-and-execute/
         */
        public async executeOrder(paymentRequest: any): Promise<any> {
            return null;
        }
    }
}