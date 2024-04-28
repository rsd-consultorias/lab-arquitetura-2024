export class CartItem {
    constructor(
        public sku: string,
        public quantity: number,
        public price: number,
        public tax?: number,
        public description?: string
    ) { }
}