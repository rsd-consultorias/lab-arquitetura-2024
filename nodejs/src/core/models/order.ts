import { ValidateMinimalCartItems, ValidateMinimalShoppingTotal } from "../domain/order.validation";
import { OrderState } from "../enums";
import { Address } from "./address.vo";
import { BaseModel } from "./basse.model";
import { BuyerInfo } from "./buyer-info";
import { PaymentInfo } from "./payment-info";
import { ShoppingCart } from "./shopping-cart";

export class Order extends BaseModel {
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
        super();
        if (shoppingCart.items) {
            this.total = shoppingCart.items.map((item) => item.price * item.quantity).reduce((x, y) => x + y);
        }

        this.addValidation(() => ValidateMinimalCartItems(this));
        this.addValidation(() => ValidateMinimalShoppingTotal(this));
    }
}