import { ValidateMinimalCartItems, ValidateMinimalShoppingTotal } from "../../domain/order.validations";
import { OrderState } from "../../enums";
import { Address } from "../value-objects/address.vo";
import { Entity } from "../base/base.entity";
import { BuyerInfo } from "./buyer-info";
import { ShoppingCart } from "./shopping-cart";

export class Order extends Entity {
    public buyerInfo?: BuyerInfo;
    public total?: number;
    public currency?: string;
    public orderState?: OrderState;

    constructor(
        public shoppingCart: ShoppingCart,
        public shippingAddress?: Address,
        public billingAddress?: Address,
        public paymentInfoId?: string
    ) {
        super();
        if (shoppingCart.items) {
            this.total = shoppingCart.items.map((item) => item.price * item.quantity).reduce((x, y) => x + y);
        }

        // Add validations
        this.addValidation(() => ValidateMinimalCartItems(this));
        this.addValidation(() => ValidateMinimalShoppingTotal(this));
    }
}