import { CartItem } from "./cart-item";

export class ShoppingCart {
    constructor(
        public transactionId: string,
        public items: Array<CartItem>
    ) { }
}