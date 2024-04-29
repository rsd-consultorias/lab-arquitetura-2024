import { CartItem } from "./cart-item";

export class ShoppingCart {
    constructor(
        public shoppingCartId: string,
        public items: Array<CartItem>
    ) { }
}