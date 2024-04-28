import { UUID, randomUUID } from "crypto";
import { CheckoutSummary } from "../../core/models/checkout-summary";
import { ShoppingCart } from "../../core/models/shopping-cart";

export class CheckoutRepository {
    teste: UUID;

    constructor() {
        this.teste = randomUUID();
    }

    public async findByTransactionId(transactionId: string): Promise<CheckoutSummary> {
        let shoppingCart = new ShoppingCart(transactionId, [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);

        return new CheckoutSummary(transactionId, "John Doe", new Date('1984-08-01'), '123456', shoppingCart);;
    }
}