import { Address } from "./address";
import { BuyerInfo } from "./buyer-info";
import { PaymentInfo } from "./payment-info";
import { ShoppingCart } from "./shopping-cart";

export enum CheckoutState {
    /** */
    CREATED = 'CREATED',
    /** State checking account is dealayed */
    CHECKING_ACCOUNT = 'CHECKING_ACCOUNT',
    /** State verifying account is delayed */
    ACCOUNT_CREATED = 'ACCOUNT_CREATED',
    /** Shipping address info updated */
    SHIPPING_ADDRESS_UPDATED = 'SHIPPING_ADDRESS_UPDATED',
    /** Billing address updated */
    BILLING_ADDRESS_UPDATED = 'BILLING_ADDRESS_UPDATED',
    /** Payment info updated */
    PAYMENT_INFO_UPDATED = 'PAYMENT_INFO_UPDATED',
    /** Payment confirmation is delayed */
    WAITING_PAYMENT = 'WAITING_PAYMENT',
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
    public checkoutState?: CheckoutState;

    constructor(
        public transactionId: string,
        public shoppingCart: ShoppingCart,
        public shippingAddress?: Address,
        public billingAddress?: Address,
        public paymentInfo?: PaymentInfo
    ) {
        if (shoppingCart.buyerInfo) {
            this.buyerInfo = shoppingCart.buyerInfo;
        }

        if (shoppingCart.items) {
            this.total = shoppingCart.items.map((item) => item.price * item.quantity).reduce((x, y) => x + y);
        }
    }
}