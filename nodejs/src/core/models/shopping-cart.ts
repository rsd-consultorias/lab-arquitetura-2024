import { CartItem } from "./cart-item.vo";

export class ShoppingCart {
    constructor(
        public id: string,
        public items: Array<CartItem>
    ) { }
}