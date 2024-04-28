import { Address } from "./address";
import { BuyerInfo } from "./buyer-info";
import { PaymentInfo as PaymentInfo } from "./payment-info";
import { ShoppingCart } from "./shopping-cart";

export enum ECheckoutState {
    CREATED = 'CREATED',
    SHIPPING_ADDRESS_UPDATED = 'SHIPPING_ADDRESS_UPDATED',
    BILLING_ADDRESS_UPDATED = 'BILLING_ADDRESS_UPDATED',
    PAYMENT_INFO_UPDATED = 'PAYMENT_INFO_UPDATED',
    FINALIZED_ACCEPTED = 'FINALIZED_ACCEPTED',
    CANCELED = 'CANCELED',
    REJECTED = 'REJECTED'
}

export class CheckoutSummary {
    public buyerInfo?: BuyerInfo;
    public total?: number;
    public checkoutState?: ECheckoutState;

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