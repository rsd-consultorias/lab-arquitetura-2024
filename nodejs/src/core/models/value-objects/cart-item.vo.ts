import { ValueObject } from "../base/base.value-object";

/** Value object */
export class CartItem extends ValueObject {
    constructor(
        public sku: string,
        public quantity: number,
        public price: number,
        public tax?: number,
        public shipping?: number,
        public insurance?: number,
        public handlingFee?: number,
        public shippingDiscount?: number,
        public discount?: number,
        public name?: string,
        public description?: string
    ) { 
        super();
    }
}