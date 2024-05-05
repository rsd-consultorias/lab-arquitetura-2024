import { OrderState } from "../enums";
import { Address } from "./address.vo";
import { BuyerInfo } from "./buyer-info";
import { PaymentInfo } from "./payment-info";
import { ShoppingCart } from "./shopping-cart";

export class Order {
    public buyerInfo?: BuyerInfo;
    public total?: number;
    public currency?: string;
    public orderState?: OrderState;

    constructor(
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