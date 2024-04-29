export class PaymentInfo { 
    public paymentPlatform?: string;
    
    /** Platform payment id */
    public platformPaymentId? : string;

    /** Platform payer id */
    public platormPayerId?: string;

    /** Persists the whole response from payment platform */
    public transactionResponseBody?: any;
}