export class PaymentInfo { 
    public paymentPlatform?: string;
    
    /** Returned from payment platform, e.g.: PayPal */
    public paymentId? : string;
    
    /** Returned from payment platform, e.g.: PayPal */
    public payerId?: string;

    /** Persists the whole response from payment platform */
    public transactionResponseBody?: any;
}