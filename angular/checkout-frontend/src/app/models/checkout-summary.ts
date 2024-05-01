import { Address } from "./address";
import { BuyerInfo } from "./buyer-info";
import { PaymentInfo } from "./payment-info";
import { ShoppingCart } from "./shopping-cart";

export enum CheckoutState {
    /** Ready to start the checkout flow*/
    CREATED = 'CREATED',
    /** Checking account is delayed */
    CHECKING_ACCOUNT = 'CHECKING_ACCOUNT',
    /** Account already exists */
    ACCOUNT_FOUND = 'ACCOUNT_FOUND',
    /** Account is created */
    ACCOUNT_CREATED = 'ACCOUNT_CREATED',
    /** Shipping address info updated */
    SHIPPING_ADDRESS_UPDATED = 'SHIPPING_ADDRESS_UPDATED',
    /** Billing address updated */
    BILLING_ADDRESS_UPDATED = 'BILLING_ADDRESS_UPDATED',
    /** Payment info updated */
    PAYMENT_INFO_UPDATED = 'PAYMENT_INFO_UPDATED',
    /** Payment confirmation is delayed */
    AWAITING_PAYMENT = 'AWAITING_PAYMENT',
    /** Payment accepted */
    PAYMENT_ACCEPTED = 'PAYMENT_ACCEPTED',
    /** Subscription confirmed */
    ACCEPTED = 'ACCEPTED',
    /** Process canceled, should inform reason */
    CANCELED = 'CANCELED',
    /** Process rejected, should inform reason */
    REJECTED = 'REJECTED'
}

export class CheckoutSummary {
    public buyerInfo?: BuyerInfo;
    public total?: number;
    public currency?: string;
    public checkoutState?: CheckoutState;
    /** URL to customer approve the payment */
    public approvalUrl?: string;

    constructor(
        public transactionId: string,
        public shoppingCart: ShoppingCart,
        public shippingAddress?: Address,
        public billingAddress?: Address,
        public paymentInfo?: PaymentInfo
    ) {
        if (shoppingCart.items) {
            this.total = shoppingCart.items.map((item) => item.price * item.quantity).reduce((x, y) => x + y);
        }
    }
}