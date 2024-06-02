import { randomUUID } from "crypto";
import { Entity } from "../base/base.entity";
import { CartItem } from "../value-objects/cart-item.vo";

export class ShoppingCart extends Entity {
    public items: Array<CartItem> = [];

    constructor(items: Array<CartItem>) {
        super();
        this.items = items;
    }
}