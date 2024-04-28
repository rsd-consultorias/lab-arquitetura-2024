import { BuyerInfo } from "./buyer-info";
import { CartItem } from "./cart-item";

export class ShoppingCart {
    constructor(
        public shoppingCartId: string,
        public buyerInfo: BuyerInfo,
        public items: Array<CartItem>
    ) { }
}