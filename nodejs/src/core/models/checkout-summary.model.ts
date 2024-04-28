import { Address } from "./address.model";
import { PaymentOption } from "./payment-option.model";
import { ShoppingCart } from "./shopping-cart.model";

export class CheckoutSummary {
    public total?: number;

    constructor(
        public transactionId: string,
        public name: string,
        public birthDate: Date,
        public fiscalIdentificationNumber: string,
        public shoppingCart: ShoppingCart,
        public shippingAddress?: Address,
        public billingAddress?: Address,
        public paymentOption?: PaymentOption
    ) { 
        if(shoppingCart.items) {
            this.total = shoppingCart.items.map((item) => item.price * item.quantity).reduce((x, y) => x + y);
        }
    }
}