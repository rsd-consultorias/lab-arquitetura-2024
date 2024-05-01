import { randomUUID } from "crypto";
import { CheckoutSummary, CheckoutState } from "../../core/models/checkout-summary";
import { ShoppingCart } from "../../core/models/shopping-cart";
import { Address } from "../../core/models/address";
import { PaymentInfo } from "../../core/models/payment-info";
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { get } from "http";

export class CheckoutRepository {

    private _repository: ModelStatic<Model<any, any>>;

    constructor(private readonly database: Sequelize) {
        this._repository = this.database.define('checkout_summary', {
            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true
            },
            checkout: {
                type: DataTypes.JSON
            }
        }, {
            paranoid: true
        });
    }

    public async createCheckout(checkoutSummary: CheckoutSummary): Promise<CheckoutSummary> {
        checkoutSummary.checkoutState = CheckoutState.CREATED;

        await this._repository.create({
            id: checkoutSummary.transactionId,
            checkout: checkoutSummary
        });

        return checkoutSummary;
    }

    public async findByTransactionId(transactionId: string): Promise<CheckoutSummary> {
        let checkoutSummary: CheckoutSummary;

        let found = await this._repository.findOne({
            where: {
                id: transactionId
            }
        });

        checkoutSummary = found?.get('checkout') as CheckoutSummary;

        return checkoutSummary;
    }

    public async updateShippingAddress(transactionId: string, address: Address): Promise<CheckoutSummary> {
        let shoppingCart = new ShoppingCart(transactionId, [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let checkoutSummary = new CheckoutSummary(transactionId, shoppingCart);
        checkoutSummary.shippingAddress = address;
        checkoutSummary.checkoutState = CheckoutState.SHIPPING_ADDRESS_UPDATED;

        return checkoutSummary;
    }

    public async updateBillingAddress(transactionId: string, address: Address): Promise<CheckoutSummary> {
        let shoppingCart = new ShoppingCart(transactionId, [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let checkoutSummary = new CheckoutSummary(transactionId, shoppingCart);
        checkoutSummary.billingAddress = address;
        checkoutSummary.checkoutState = CheckoutState.BILLING_ADDRESS_UPDATED;

        return checkoutSummary;
    }

    public async updatePaymentInfo(transactionId: string, paymentInfo: PaymentInfo): Promise<CheckoutSummary> {
        let shoppingCart = new ShoppingCart(transactionId, [
            { sku: 'XPTO1234', price: 799.34, quantity: 1 },
            { sku: 'XPTO5678', price: 1799.34, quantity: 2 }
        ]);
        let checkoutSummary = new CheckoutSummary(transactionId, shoppingCart);
        checkoutSummary.paymentInfo = paymentInfo;
        checkoutSummary.checkoutState = CheckoutState.PAYMENT_INFO_UPDATED;

        return checkoutSummary;
    }

    public async finalize(checkoutSummary: CheckoutSummary): Promise<CheckoutSummary> {
        checkoutSummary.checkoutState = CheckoutState.ACCEPTED;

        let found = await this._repository.findOne({
            where: {
                id: checkoutSummary.transactionId
            }
        });

        found?.set('checkout', checkoutSummary);

        await found?.save({
            fields: ['checkout']
        });

        await found?.reload();

        // found = await this._repository.findOne({
        //     where: {
        //         id: checkoutSummary.transactionId
        //     }
        // });
        checkoutSummary = found?.get('checkout') as CheckoutSummary;

        return checkoutSummary;
    }
}