import { Address } from "./address";
import { BuyerInfo } from "./buyer-info";
import { PaymentInfo } from "./payment-info";
import { ShoppingCart } from "./shopping-cart";

export enum TransactionState {
    COMPLETED = 'COMPLETED',
    DECLINED = 'DECLINED',
    PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
    PENDING = 'PENDING',
    REFUNDED = 'REFUNDED',
    FAILED = 'FAILED'
}

export class Transaction {
    public buyerInfo?: BuyerInfo;
    public total?: number;
    public currency?: string;
    public transactionState?: TransactionState;

    constructor(
        public shoppingCart?: ShoppingCart,
        public shippingAddress?: Address,
        public billingAddress?: Address,
        public paymentInfo?: PaymentInfo
    ) {
        if (shoppingCart?.items) {
            this.total = shoppingCart.items.map((item) => item.price * item.quantity).reduce((x, y) => x + y);
        }
    }
}