import { Entity } from "../base/base.entity";

export class PaymentInfo extends Entity {

    /** Transaction token */
    public token?: string;

    public paymentPlatform?: string;

    /** Platform payment id */
    public platformPaymentId?: string;

    /** Platform payer id */
    public platormPayerId?: string;

    /** Platform token */
    public platformToken?: string;

    public approveUrl?: string;
    public cancelUrl?: string;
    public refundUrl?: string;
}