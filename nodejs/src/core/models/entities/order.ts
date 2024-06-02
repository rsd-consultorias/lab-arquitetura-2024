import { ValidateMinimalCartItems, ValidateMinimalShoppingTotal } from "../../domain/order.validations";
import { OrderState } from "../../enums";
import { Address } from "../value-objects/address.vo";
import { Entity } from "../base/base.entity";
import { CustomerInfo } from "./customer-info";
import { ShoppingCart } from "./shopping-cart";

export class Order extends Entity {
    public shoppingCart?: ShoppingCart;
    public shippingAddress?: Address;
    public billingAddress?: Address;
    public paymentInfoId?: string;
    public customerInfoId?: string;
    public currency?: string;
    public orderState?: OrderState;

    constructor() {
        super();

        // Add validations
        this.addValidation(() => ValidateMinimalCartItems(this));
        this.addValidation(() => ValidateMinimalShoppingTotal(this));
    }

    public sumTotal(): number {
        if(!this.shoppingCart! || !this.shoppingCart!.items) {
            return 0;
        }
        return this.shoppingCart!.items.map((item) => item.price * item.quantity).reduce((x, y) => x + y);
    }
}