import { Address } from "./address";
import { BuyerInfo } from "./buyer-info";
import { PaymentOption } from "./payment-option";
import { ShoppingCart } from "./shopping-cart";

export class CheckoutSummary {
    public buyerInfo?: BuyerInfo;
    public total?: number;

    constructor(
        public transactionId: string,
        public shoppingCart: ShoppingCart,
        public shippingAddress?: Address,
        public billingAddress?: Address,
        public paymentOption?: PaymentOption
    ) {
        if (shoppingCart.buyerInfo) {
            this.buyerInfo = shoppingCart.buyerInfo;
        }
        
        if (shoppingCart.items) {
            this.total = shoppingCart.items.map((item) => item.price * item.quantity).reduce((x, y) => x + y);
        }
    }
}