import { CartItem } from "./cart-item.value-object";

export class ShoppingCart {
    constructor(
        public transactionId: string,
        public items: Array<CartItem>
    ) { }
}