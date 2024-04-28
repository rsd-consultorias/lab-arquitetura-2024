export class PaymentInfo { 
    public paymentPlatform?: string;
    
    /** Returned from payment platform, e.g.: PayPal */
    public platformPaymentId? : string;

    /** Persists the whole response from payment platform */
    public transactionResponseBody?: any;
}