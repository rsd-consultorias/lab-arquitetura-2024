import { randomUUID } from "crypto";
import { CheckoutSummary, CheckoutState } from "../../core/models/checkout-summary";
import { ShoppingCart } from "../../core/models/shopping-cart";
import { Address } from "src/core/models/address";
import { PaymentInfo } from "../../core/models/payment-info";
import { BuyerInfo } from "../../core/models/buyer-info";

export class CheckoutRepository {

    constructor() { }

    public async createCheckout(shoppingCart: ShoppingCart): Promise<CheckoutSummary> {
        let checkoutSummary = new CheckoutSummary(randomUUID(), shoppingCart);
        checkoutSummary.checkoutState = CheckoutState.CREATED;

        return checkoutSummary;
    }

    public async findByTransactionId(transactionId: string): Promise<CheckoutSummary> {
        let shoppingCart = new ShoppingCart(transactionId, new BuyerInfo("John Doe", new Date('1984-08-01'), '123456'), [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let checkoutSummary = new CheckoutSummary(transactionId, shoppingCart);
        checkoutSummary.checkoutState = CheckoutState.CREATED;

        return checkoutSummary;
    }

    public async updateShippingAddress(transactionId: string, address: Address): Promise<CheckoutSummary> {
        let shoppingCart = new ShoppingCart(transactionId, new BuyerInfo("John Doe", new Date('1984-08-01'), '123456'), [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let checkoutSummary = new CheckoutSummary(transactionId, shoppingCart);
        checkoutSummary.shippingAddress = address;
        checkoutSummary.checkoutState = CheckoutState.SHIPPING_ADDRESS_UPDATED;

        return checkoutSummary;
    }

    public async updateBillingAddress(transactionId: string, address: Address): Promise<CheckoutSummary> {
        let shoppingCart = new ShoppingCart(transactionId, new BuyerInfo("John Doe", new Date('1984-08-01'), '123456'), [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let checkoutSummary = new CheckoutSummary(transactionId, shoppingCart);
        checkoutSummary.billingAddress = address;
        checkoutSummary.checkoutState = CheckoutState.BILLING_ADDRESS_UPDATED;

        return checkoutSummary;
    }

    public async updatePaymentInfo(transactionId: string, paymentInfo: PaymentInfo): Promise<CheckoutSummary> {
        let shoppingCart = new ShoppingCart(transactionId, new BuyerInfo("John Doe", new Date('1984-08-01'), '123456'), [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let checkoutSummary = new CheckoutSummary(transactionId, shoppingCart);
        checkoutSummary.paymentInfo = paymentInfo;
        checkoutSummary.checkoutState = CheckoutState.PAYMENT_INFO_UPDATED;

        return checkoutSummary;
    }

    public async finalize(transactionId: string): Promise<CheckoutSummary> {
        let shoppingCart = new ShoppingCart(transactionId, new BuyerInfo("John Doe", new Date('1984-08-01'), '123456'), [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let checkoutSummary = new CheckoutSummary(transactionId, shoppingCart);
        checkoutSummary.checkoutState = CheckoutState.ACCEPTED;

        return checkoutSummary;
    }
}