import { randomUUID } from "crypto";
import { CheckoutSummary } from "../../core/models/checkout-summary";
import { ShoppingCart } from "../../core/models/shopping-cart";
import { Address } from "src/core/models/address";
import { PaymentOption } from "../../core/models/payment-option";
import { BuyerInfo } from "../../core/models/buyer-info";

export class CheckoutRepository {

    constructor() { }

    public async createCheckout(shoppingCart: ShoppingCart): Promise<CheckoutSummary> {

        return new CheckoutSummary(randomUUID(), shoppingCart);;
    }

    public async findByTransactionId(transactionId: string): Promise<CheckoutSummary> {
        let shoppingCart = new ShoppingCart(transactionId, new BuyerInfo("John Doe", new Date('1984-08-01'), '123456'), [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let checkoutSummary = new CheckoutSummary(transactionId, shoppingCart);

        return checkoutSummary;
    }

    public async updateShippingAddress(transactionId: string, address: Address): Promise<CheckoutSummary> {
        let shoppingCart = new ShoppingCart(transactionId, new BuyerInfo("John Doe", new Date('1984-08-01'), '123456'), [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let checkoutSummary = new CheckoutSummary(transactionId, shoppingCart);
        checkoutSummary.shippingAddress = address;

        return checkoutSummary;
    }

    public async updateBillingAddress(transactionId: string, address: Address): Promise<CheckoutSummary> {
        let shoppingCart = new ShoppingCart(transactionId, new BuyerInfo("John Doe", new Date('1984-08-01'), '123456'), [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let checkoutSummary = new CheckoutSummary(transactionId, shoppingCart);
        checkoutSummary.billingAddress = address;

        return checkoutSummary;
    }

    public async updatePaymentOption(transactionId: string, paymentOption: PaymentOption): Promise<CheckoutSummary> {
        let shoppingCart = new ShoppingCart(transactionId, new BuyerInfo("John Doe", new Date('1984-08-01'), '123456'), [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let checkoutSummary = new CheckoutSummary(transactionId, shoppingCart);
        checkoutSummary.paymentOption = paymentOption;

        return checkoutSummary;
    }
}