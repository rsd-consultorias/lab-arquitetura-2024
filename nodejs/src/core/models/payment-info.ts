export class PaymentInfo {
    public paymentPlatform?: string;

    /** Platform payment id */
    public platformPaymentId?: string;

    /** Platform payer id */
    public platormPayerId?: string;

    /** Platform token */
    public token?: string;

    public approveUrl?: string;
    public cancelUrl?: string;
}