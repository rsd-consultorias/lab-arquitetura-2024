import { randomUUID } from "crypto";
import { Entity } from "../base/base.entity";
import { CartItem } from "../value-objects/cart-item.vo";

export class ShoppingCart extends Entity {
    constructor(
        public items: Array<CartItem>
    ) { 
        super();
    }
}